(function () {
	'use strict';

	angular
	  .module('kendoSpa')
	  .controller('MainController', MainController);

	/** @ngInject */
	function MainController($timeout, webDevTec, toastr, spotsFilterService) {
		var vm = this;

		function onDateChange() {
		};

		vm.monthSelectorOptions = {
			start: "year",
			depth: "year",

			change: onDateChange
		};

		vm.hcDataSource = [
			{ id: 0, name: "Alle" },
			{ id: 1, name: "Option 1" },
			{ id: 2, name: "Option 2" }
		];

		vm.statusDataSource = [
			{ id: 0, name: "Alle" },
			{ id: 1, name: "Aktive" },
			{ id: 2, name: "Inaktive" }
		];

		vm.categorieDataSource = [
			{ id: 0, name: "Alle" },
			{ id: 1, name: "Image" },
			{ id: 2, name: "National" },
			{ id: 3, name: "Image & National" },
			{ id: 4, name: "Bau & Hobby" },
			{ id: 5, name: "Warenhaus" },
			{ id: 6, name: "Regional" },
			{ id: 7, name: "Regional BE" },
			{ id: 8, name: "Regional NWZZ" },
			{ id: 9, name: "Regional OT" },
			{ id: 10, name: "Regional SR" },
			{ id: 11, name: "Extern" },
			{ id: 12, name: "Pronto" }
		];

		vm.languageDataSource = [
			{ id: 0, name: "Alle" },
			{ id: 1, name: "Deutsch" },
			{ id: 2, name: "Französisch" },
			{ id: 3, name: "Italienisch" }
		];

		vm.formatDataSource = [
			{ id: 0, name: "Alle" },
			{ id: 1, name: "A" },
			{ id: 2, name: "B" },
			{ id: 3, name: "C" },
			{ id: 4, name: "M" },
			{ id: 5, name: "BH" },
			{ id: 6, name: "WH" },
			{ id: 7, name: "ProntoA" },
			{ id: 8, name: "ProntoB" },
			{ id: 9, name: "ProntoC" },
			{ id: 10, name: "ProntoD" }

		];

		vm.regionDataSource = [
			{ id: 0, name: "Alle" },
			{ id: 1, name: "BE" },
			{ id: 2, name: "NWZZ" },
			{ id: 3, name: "OT" },
			{ id: 4, name: "SR" },
			{ id: 5, name: "TOEL" }
		];

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


		vm.spotsFilter = spotsFilterService;
	}
})();
