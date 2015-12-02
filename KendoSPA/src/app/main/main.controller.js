(function () {
	'use strict';

	angular
	  .module('kendoSpa')
	  .controller('MainController', MainController);

	/** @ngInject */
	function MainController($scope, $timeout, $translate, toastr,
							spotsFilterService, uiDataSourcesService, addSpotModalService, editSpotModalService) {
		var vm = this;

		vm.addSpot = function ($event) {
			addSpotModalService
				.open()
				.then(function (newItem) {
					vm.spotsGridDataSource.add(newItem);
				});
		};

		vm.editSpot = function ($event) {
			editSpotModalService
				.open(vm.selectedSpot)
				.then(function (newItem) {
				});
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
			data: [
				{ spotName: "Spot 1", language: "English", startDate: "2015/10/1", endDate: "2015/10/5", stType: "BH;", region: "BE;NW;", status: 1, hc: "", vst: "some vst" },
				{ spotName: "Spot 2", language: "Spanish", startDate: "2014/10/1", endDate: "2014/10/5", stType: "BH;", region: "NW;", status: 2, hc: "", vst: "some vst" },
				{ spotName: "Spot 3", language: "German", startDate: "2015/9/1", endDate: "2015/9/5", stType: ";", region: "BE;NW;", status: 2, hc: "", vst: "some vst" },
				{ spotName: "Spot 4", language: "English", startDate: "2015/10/1", endDate: "2015/10/5", stType: ";", region: "NW;", status: 1, hc: "", vst: "some vst" },
				{ spotName: "Spot 5", language: "English", startDate: "2015/10/1", endDate: "2015/10/5", stType: "BH;", region: "BE;NW;", status: 1, hc: "", vst: "some vst" },
				{ spotName: "Spot 6", language: "Spanish", startDate: "2014/10/1", endDate: "2014/10/5", stType: "BH;", region: "NW;", status: 2, hc: "", vst: "some vst" },
				{ spotName: "Spot 7", language: "German", startDate: "2015/9/1", endDate: "2015/9/5", stType: ";", region: "BE;NW;", status: 2, hc: "", vst: "some vst" },
				{ spotName: "Spot 8", language: "English", startDate: "2015/10/1", endDate: "2015/10/5", stType: ";", region: "NW;", status: 1, hc: "", vst: "some vst" },
				{ spotName: "Spot 9", language: "English", startDate: "2015/10/1", endDate: "2015/10/5", stType: ";", region: "NW;", status: 1, hc: "", vst: "some vst" },
				{ spotName: "Spot 10", language: "English", startDate: "2015/10/1", endDate: "2015/10/5", stType: "BH;", region: "BE;NW;", status: 1, hc: "", vst: "some vst" },
				{ spotName: "Spot 11", language: "Spanish", startDate: "2014/10/1", endDate: "2014/10/5", stType: "BH;", region: "NW;", status: 2, hc: "", vst: "some vst" },
				{ spotName: "Spot 12", language: "German", startDate: "2015/9/1", endDate: "2015/9/5", stType: ";", region: "BE;NW;", status: 2, hc: "", vst: "some vst" },
				{ spotName: "Spot 13", language: "English", startDate: "2015/10/1", endDate: "2015/10/5", stType: ";", region: "NW;", status: 1, hc: "", vst: "some vst" }
			],
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
						field: "spotName",
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
						width: "60px"
					}, {
						field: "endDate",
						title: "End Datum",
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
