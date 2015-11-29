(function() {
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
		{ id: 0, name: "All" },
		{ id: 1, name: "Option 1" },
		{ id: 2, name: "Option 2" }
	];

	vm.statusDataSource = [
		{ id: 0, name: "All" },
		{ id: 1, name: "Option 1" },
		{ id: 2, name: "Option 2" }
	];

	vm.categorieDataSource = [
		{ id: 0, name: "All" },
		{ id: 1, name: "Option 1" },
		{ id: 2, name: "Option 2" }
	];

	vm.languageDataSource = [
		{ id: 0, name: "All" },
		{ id: 1, name: "English" },
		{ id: 2, name: "German" }
	];

	vm.formatDataSource = [
		{ id: 0, name: "All" },
		{ id: 1, name: "Option 1" },
		{ id: 2, name: "Option 2" }
	];

	vm.regionDataSource = [
		{ id: 0, name: "All" },
		{ id: 1, name: "Option 1" },
		{ id: 2, name: "Option 2" }
	];

	vm.spotsGridDataSource = new kendo.data.DataSource({
		data: [
			{ spotName: "Spot 1", language: "English", startDate: "2015/10/1", endDate: "2015/10/5", stType: "BH;", region: "BE;NW;", status: 1, hc: "", vst: "some vst" },
			{ spotName: "Spot 2", language: "Spanish", startDate: "2014/10/1", endDate: "2014/10/5", stType: "BH;", region: "NW;", status: 2, hc: "", vst: "some vst" },
			{ spotName: "Spot 3", language: "German", startDate: "2015/9/1", endDate: "2015/9/5", stType: ";", region: "BE;NW;", status: 2, hc: "", vst: "some vst" },
			{ spotName: "Spot 4", language: "English", startDate: "2015/10/1", endDate: "2015/10/5", stType: ";", region: "NW;", status: 1, hc: "", vst: "some vst" }
		]
	});

	vm.selectedSpot = null;

	vm.spotsGridRowSelected = function () {
		return !!vm.selectedSpot;
	};

	vm.spotsGridChanged = function (data, dataItem, columns) {
		vm.selectedSpot = dataItem;
		console.log(dataItem);
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
			title: "Language",
			width: "60px"
		}, {
			field: "startDate",
			title: "Start Date",
			width: "60px"
		}, {
			field: "endDate",
			title: "End Date",
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
