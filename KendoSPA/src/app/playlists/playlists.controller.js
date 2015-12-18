(function() {
  'use strict';

  angular
	.module('kendoSpa')
	.controller('PlaylistsController', PlaylistsController);

  /** @ngInject */
  function PlaylistsController($scope, $timeout, $translate, kendo, locale) {
	var vm = this;

	vm.locale = locale;

	$scope.$on("kendoLocaleChanged", function (event, message) {
		if (vm.locale != message.locale)
			buildOptions();

		vm.locale = message.locale;
	});

	vm.playlistsGridDataSource = new kendo.data.DataSource({
		data: [
			{ spotName: "Spot 1", type: "T", abspielzeit: "6:01" },
			{ spotName: "Spot 2", type: "M", abspielzeit: "3:59" },
			{ spotName: "Spot 3", type: "L", abspielzeit: "5:45" },
			{ spotName: "Spot 4", type: "P", abspielzeit: "6:07" },
			{ spotName: "Spot 5", type: "M", abspielzeit: "4:58" },
			{ spotName: "Spot 6", type: "L", abspielzeit: "6:01" },
			{ spotName: "Spot 7", type: "M", abspielzeit: "6:01" },
			{ spotName: "Spot 8", type: "T", abspielzeit: "6:01" },
			{ spotName: "Spot 9", type: "M", abspielzeit: "6:01" },
			{ spotName: "Spot 10", type: "P", abspielzeit: "6:01" },
			{ spotName: "Spot 11", type: "T", abspielzeit: "6:01" },
			{ spotName: "Spot 12", type: "T", abspielzeit: "6:01" },
			{ spotName: "Spot 13", type: "T", abspielzeit: "6:01" }
		],
		pageSize: 8
	});

	vm.selectedPlaylist = null;

	vm.playlistsGridRowSelected = function () {
		return !!vm.selectedPlaylist;
	};

	vm.playlistsGridChanged = function (data, dataItem, columns) {
		vm.selectedPlaylist = dataItem;
	};


	vm.spotsGridDataSource = new kendo.data.DataSource({
		data: [
			{ spotName: "Spot 1" },
			{ spotName: "Spot 2" },
			{ spotName: "Spot 3" },
			{ spotName: "Spot 4" },
			{ spotName: "Spot 5" },
			{ spotName: "Spot 6" },
			{ spotName: "Spot 7" },
			{ spotName: "Spot 8" },
			{ spotName: "Spot 9" },
			{ spotName: "Spot 10" },
			{ spotName: "Spot 11" },
			{ spotName: "Spot 12" },
			{ spotName: "Spot 13" }
		],
		pageSize: 8
	});

	vm.selectedSpot = null;

	vm.spotsGridChanged = function (data, dataItem, columns) {
		vm.selectedSpot = dataItem;
	};

	buildOptions();

	function buildOptions() {
		$translate(["Spot Name"]).then(function (translations) {
			vm.spotsGridOptions = {
				dataSource: vm.spotsGridDataSource,
				sortable: true,
				pageable: true,
				filterable: true,
				selectable: "row",
				columns: [{
					field: "spotName",
					title: translations["Spot Name"],
					width: "100%",
					filterable: true
				}]
			};
		});

		$translate(["Abspielzeit", "Type","Spot Name"]).then(function (translations) {
			vm.playlistsGridOptions = {
				dataSource: vm.playlistsGridDataSource,
				sortable: true,
				pageable: true,
				filterable: true,
				selectable: "row",
				columns: [{
					field: "abspielzeit",
					title: translations["Abspielzeit"],
					width: "60px"
				}, {
					field: "type",
					title: translations["Type"],
					width: "60px"
				}, {
					field: "spotName",
					title: translations["Spot Name"],
					width: "120px",
					filterable: true
				}]
			};
		});
	}

  }
})();
