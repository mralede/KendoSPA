(function () {
	'use strict';

	angular
	  .module('kendoSpa')
	  .controller('MainController', MainController);

	/** @ngInject */
	function MainController($scope, $timeout, $translate, toastr, _,
							spotsFilterService, uiDataSourcesService, addSpotModalService, editSpotModalService,
							spotsDataService) {
		var vm = this;

		vm.addSpot = function ($event) {
			editSpotModalService
				.open()
				.then(function (spot) {
					spotsDataService.addSpot(spot);
				});
		};

		vm.editSpot = function ($event) {
			editSpotModalService
				.open(vm.selectedSpot.getData())
				.then(function (spot) {
					console.log(spot);
					spotsDataService.updateSpot(spot);

					vm.selectedSpot = null;
				});
		};

		vm.copySpot = function ($event) {
			var spot = vm.selectedSpot.clone();
			spotsDataService.addSpot(spot);

			vm.selectedSpot = null;
		};

		vm.deleteSpot = function ($event) {
			spotsDataService.deleteSpot(vm.selectedSpot.get("id"));

			vm.selectedSpot = null;
		};

		vm.locale = null;

		$scope.$on("kendoLocaleChanged", function (event, message) {
			vm.monthSelectorOptions.culture = message.locale;

			if (vm.locale != message.locale)
				buildOptions();

			vm.locale = message.locale;
		});

		function onDateChange() {
		};

		vm.monthSelectorOptions = {
			start: "year",
			depth: "year",

			change: onDateChange
		};


		vm.spotsGridDataSource = new kendo.data.DataSource({
			data: spotsDataService.getSpots(),
			schema: {
				model: {
					id: "id",
					fields: {
						startDate: { type: "date", format: "{0:dd/MM/yyyy}" },
						endDate: { type: "date", format: "{0:dd/MM/yyyy}" }
					}
				}
			},
			pageSize: 8
		});

		vm.selectedSpot = null;

		vm.spotsGridRowSelected = function () {
			return !!vm.selectedSpot;
		};

		vm.spotsGridChanged = function (data, dataItem, columns) {
			vm.selectedSpot = dataItem;
		};

		vm.spotsFilter = spotsFilterService;

		buildOptions();


		function buildOptions() {
			uiDataSourcesService.getHcDataSource().then(function (result) {
				vm.hcDataSource = result;
			});

			uiDataSourcesService.getStatusDataSource().then(function (result) {
				vm.statusDataSource = result;
			});

			uiDataSourcesService.getCategoriesDataSource().then(function (result) {
				vm.categorieDataSource = result;
			});

			uiDataSourcesService.getLanguageDataSource().then(function (result) {
				vm.languageDataSource = result;
			});

			uiDataSourcesService.getRegioDataSource().then(function (result) {
				vm.regionDataSource = result;
			});

			uiDataSourcesService.getFormatDataSource().then(function (result) {
				vm.formatDataSource = result;
			});


			$translate(['Alle', 'Aktive', 'Inaktive']).then(function (translations) {
				vm.spotsGridOptions = {
					dataSource: vm.spotsGridDataSource,
					sortable: true,
					pageable: true,
					filterable: true,
					selectable: "row",
					columns: [{
						field: "spotName()",
						title: "Spot Name",
						width: "120px",
						filterable: true
					}, {
						field: "language",
						title: "Sprache",
						width: "60px"
					}, {
						field: "startDate",
						title: "Start Datum",
						type: "date",
						format: "{0:dd/MM/yyyy}",
						width: "60px"
					}, {
						field: "endDate",
						title: "End Datum",
						type: "date",
						format: "{0:dd/MM/yyyy}",
						width: "60px"
					}, {
						field: "vstType",
						title: "VST Type",
						width: "60px"
					}, {
						field: "region",
						title: "Region",
						width: "60px"
					}, {
						field: "status",
						title: "Status",
						width: "60px"
					}, {
						field: "hc",
						title: "HC",
						width: "60px"
					}, {
						field: "vst",
						title: "VST",
						width: "60px"
					}]
				};
			});

		}
	}
})();
