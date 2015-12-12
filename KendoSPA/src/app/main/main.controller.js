(function () {
	'use strict';

	angular
		.module('kendoSpa')
		.controller('MainController', MainController);

	/** @ngInject */
	function MainController($scope, $timeout, $translate, $q, toastr, _, kendo,
							spotsFilterService, uiDataSourcesService, editSpotModalService,
							spotsDataService) {
		var vm = this;

		vm.addSpot = function ($event) {
			$event.preventDefault();

			editSpotModalService
				.open()
				.then(function (spot) {
					spotsDataService.addSpot(spot);
				});
		};

		vm.editSpot = function ($event) {
			$event.preventDefault();

			editSpotModalService
				.open(vm.selectedSpot.getData())
				.then(function (spot) {
					spotsDataService.updateSpot(spot);

					vm.selectedSpot = null;
				});
		};

		vm.copySpot = function ($event) {
			$event.preventDefault();

			var spot = vm.selectedSpot.clone();
			spotsDataService.addSpot(spot);

			vm.selectedSpot = null;
		};

		vm.deleteSpot = function ($event) {
			$event.preventDefault();

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
		}

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
			pageSize: 20
		});

		vm.selectedSpot = null;

		vm.spotsGridRowSelected = function () {
			return !!vm.selectedSpot;
		};

		vm.spotsGridChanged = function (data, dataItem/*, columns*/) {
			vm.selectedSpot = dataItem;
		};

		buildOptions();


		function buildOptions() {
			var hc = uiDataSourcesService.getHcDataSource().then(function (result) {
				vm.hcDataSource = result;
			});

			var statuses = uiDataSourcesService.getStatusDataSource().then(function (result) {
				vm.statusDataSource = result;
			});

			var categories = uiDataSourcesService.getCategoriesDataSource().then(function (result) {
				vm.categorieDataSource = result;
			});

			var languages = uiDataSourcesService.getLanguageDataSource().then(function (result) {
				vm.languageDataSource = result;
			});

			var regions = uiDataSourcesService.getRegioDataSource().then(function (result) {
				vm.regionDataSource = result;
			});

			var formats = uiDataSourcesService.getFormatDataSource().then(function (result) {
				vm.formatDataSource = result;
			});


			$translate(["Spot Name", "Sprache", "Start Datum", "End Datum", "VST Type", "Status"]).then(function (translations) {
				vm.spotsGridOptions = {
					dataSource: vm.spotsGridDataSource,
					sortable: true,
					pageable: true,
					filterable: true,
					selectable: "row",
					columns: [{
						field: "spotName()",
						title: translations["Spot Name"],
						width: "120px",
						filterable: true
					}, {
						field: "language",
						title: translations["Sprache"],
						width: "60px"
					}, {
						field: "startDate",
						title: translations["Start Datum"],
						type: "date",
						format: "{0:dd/MM/yyyy}",
						width: "60px"
					}, {
						field: "endDate",
						title: translations["End Datum"],
						type: "date",
						format: "{0:dd/MM/yyyy}",
						width: "60px"
					}, {
						field: "vstType",
						title: translations["VST Type"],
						width: "60px"
					}, {
						field: "region",
						title: translations["Region"],
						width: "60px"
					}, {
						field: "status",
						title: translations["Status"],
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

			$q.all(hc, statuses, categories, languages, regions, formats).then(function () {
				vm.spotsFilter = spotsFilterService;

			});
		}
	}
})();
