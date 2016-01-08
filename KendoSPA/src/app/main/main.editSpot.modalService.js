(function () {
	'use strict';

	angular
	.module('kendoSpa')
	.factory('editSpotModalService', editSpotModalService)
	.controller('EditSpotModalController', EditSpotModalController);

	/** @ngInject */
	function editSpotModalService($uibModal) {

		function open(spot, files) {

			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'app/main/editSpot.html',
				controller: 'EditSpotModalController as editSpot',
				size: "lg",
				resolve: {
					spot: function () {
						return spot;
					},
					files: function () {
						return files;
					}
				}
			});

			return modalInstance.result;
		}

		return {
			open: open
		}
	}

	/** @ngInject */
	function EditSpotModalController(_, $uibModalInstance, $translate, Spot, spot, files, uiDataSourcesService, FilesList) {
		var vm = this;

		//vm.files = files || [];

		//vm.addFiles= function($files) {
		//	if ($files && $files.length) {
		//		for (var i = 0; i < $files.length; i++) {
		//			vm.files.push($files[i]);
		//		}
		//	}
		//}


		if (spot) {
			vm.editMode = true;

			vm.spot = angular.copy(spot);

			if (spot.files) {
				vm.filesList = new FilesList(angular.copy(spot.files));
			} else {
				vm.filesList = new FilesList([]);
			}

		} else {
			vm.editMode = false;

			vm.spot = new Spot({
				type: null,
				language: null,
				nameThirdOption: null,
				name: null,

				status: null,
				campaign: null,
				theme: null,
				text: null,

				startDate: null,
				endDate: null,

				hc: null,

				format: "",

				region: "",

				vstType: "WH",
				vst: null
			});

			vm.filesList = new FilesList(files || []);
		}

		vm.typeDataSource = [
				{ id: "P_EX", name: "P_EX" },
				{ id: "N_CH", name: "N_CH" },
				{ id: "N_BH", name: "N_BH" }
		]

		vm.languageDataSource = [
			{ id: "D", name: "_D_" },
			{ id: "F", name: "_F_" },
			{ id: "I", name: "_I_" }
		]


		vm.validatorOptions = {
			rules: {
				regions: function (input) {
					if (input.is("[name=region]")) {
						return angular.element("#editSpotForm").find("[name=region]").is(":checked");
					}
					return true;
				},
				formats: function (input) {
					if (input.is("[name=format]")) {
						return angular.element("#editSpotForm").find("[name=format]").is(":checked");
					}
					return true;
				}
			},
			messages: {
				required: "Required",
				regions: "Required",
				formats: "Required"
			}
		};

		vm.submitted = false;

		vm.submit = function (event) {
			event.preventDefault();

			//$scope.submitted = true;

			//if ($scope.editSpotForm.$valid) {
			//	$scope.spot.format = getSelected($scope.formats);
			//	$scope.spot.region = getSelected($scope.regions);

			//	$uibModalInstance.close($scope.spot);
			//}

			if (vm.validator.validate()) {
				vm.spot.format = getSelected(vm.formats);
				vm.spot.region = getSelected(vm.regions);

				vm.spot.files = vm.filesList.getFiles();

				$uibModalInstance.close(vm.spot);
			}
		};

		vm.cancel = function () {
			$uibModalInstance.dismiss('cancel');

			vm.filesList = null;
		};


		buildOptions(vm.spot);

		function buildOptions(spot) {
			uiDataSourcesService.getStatusDataSource().then(function (result) {
				vm.statusDataSource = _(result).chain()
													.filter(function (x) {
														return x.id;
													})
													.value();
			});

			uiDataSourcesService.getFormatDataSource().then(function (result) {
				var selectedFormats = (spot.format || "").split(";");

				vm.formats = _(result).chain()
											.filter(function (x) {
												return x.id;
											})
											.each(function (item) {
												item.selected = _.any(selectedFormats, function (format) {
													return item.name == format;
												});
											})
											.value();
			});

			uiDataSourcesService.getRegioDataSource().then(function (result) {
				var selectedRegions = (spot.region || "").split(";");

				vm.regions = _(result).chain()
											.filter(function (x) {
												return x.id;
											})
											.each(function (item) {
												item.selected = _.any(selectedRegions, function (region) {
													return item.name == region;
												});
											})
											.value();
			});

			uiDataSourcesService.getHcDataSource().then(function (result) {
				vm.hcDataSource = _(result).chain()
												.filter(function (x) {
													return x.id;
												})
												.value();

				$translate(["<nicht definiert>"]).then(function (translations) {
					vm.hcDropDownOptions = {
						dataSource: vm.hcDataSource,
						dataTextField:"name",
						dataValueField:"id",
						optionLabel: translations["<nicht definiert>"]
					};
				});
			});
		}

		function getSelected(arr) {
			var selected = _(arr)
				.chain()
				.filter(function (item) {
					return !!item.selected;
				})
				.map(function (item) {
					return item.name;
				})
				.value();

			return selected.join(";");
		}
	}

})();
