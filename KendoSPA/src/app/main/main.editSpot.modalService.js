(function () {
	'use strict';

	angular
	.module('kendoSpa')
	.factory('editSpotModalService', editSpotModalService)
	.controller('EditSpotModalController', EditSpotModalController);

	/** @ngInject */
	function editSpotModalService($uibModal) {

		function open(spot) {

			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'app/main/editSpot.html',
				controller: 'EditSpotModalController',
				size: "lg",
				resolve: {
					spot: function () {
						return spot;
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
	function EditSpotModalController($scope, $uibModalInstance, $translate, Spot, spot, uiDataSourcesService) {
		//$scope.spot = spot;

		if (spot) {
			$scope.editMode = true;

			$scope.spot = angular.copy(spot);
		} else {
			$scope.editMode = false;

			$scope.spot = new Spot({
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
		}

		$scope.typeDataSource = [
				{ id: "P_EX", name: "P_EX" },
				{ id: "N_CH", name: "N_CH" },
				{ id: "N_BH", name: "N_BH" }
		]

		$scope.languageDataSource = [
			{ id: "D", name: "_D_" },
			{ id: "F", name: "_F_" },
			{ id: "I", name: "_I_" }
		]


		$scope.validatorOptions = {
			rules: {
				regions: function (input) {
					if (input.is("[name=region]")) {
						return $("#editSpotForm").find("[name=region]").is(":checked");
					}
					return true;
				},
				formats: function (input) {
					if (input.is("[name=format]")) {
						return $("#editSpotForm").find("[name=format]").is(":checked");
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

		$scope.submitted = false;

		$scope.submit = function (event) {
			event.preventDefault();

			//$scope.submitted = true;

			//if ($scope.editSpotForm.$valid) {
			//	$scope.spot.format = getSelected($scope.formats);
			//	$scope.spot.region = getSelected($scope.regions);

			//	$uibModalInstance.close($scope.spot);
			//}

			if ($scope.validator.validate()) {
				$scope.spot.format = getSelected($scope.formats);
				$scope.spot.region = getSelected($scope.regions);

				$uibModalInstance.close($scope.spot);
			}
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};


		buildOptions($scope.spot);

		function buildOptions(spot) {
			uiDataSourcesService.getStatusDataSource().then(function (result) {
				$scope.statusDataSource = _(result).chain()
													.filter(function (x) {
														return x.id;
													})
													.value();
			});

			uiDataSourcesService.getFormatDataSource().then(function (result) {
				var selectedFormats = (spot.format || "").split(";");

				$scope.formats = _(result).chain()
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

				$scope.regions = _(result).chain()
											.filter(function (x) {
												return x.id;
											})
											.each(function (item) {
												item.selected = _.any(selectedRegions, function (region) {
													return item.name == region;
												});
											})
											.value();;
			});

			uiDataSourcesService.getHcDataSource().then(function (result) {
				$scope.hcDataSource = _(result).chain()
												.filter(function (x) {
													return x.id;
												})
												.value();

				$translate(["<nicht definiert>"]).then(function (translations) {
					$scope.hcDropDownOptions = {
						dataSource: $scope.hcDataSource,
						dataTextField:"name",
						dataValueField:"id",
						optionLabel: translations["<nicht definiert>"]
					};
				});
			});
		};

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
		};
	}

})();
