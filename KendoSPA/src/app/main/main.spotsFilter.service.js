(function () {
	'use strict';

	angular
	  .module('kendoSpa')
	  .factory('spotsFilterService', spotsFilter);

	function spotsFilter() {
		var filter = {
			allOption: 0,
			dateRange: {},
			yearMonth: null,

			gridFilter: {
				spotName: null,
				campaign: null,
				hc: 0,
				status: 0,
				categorie: 0,
				language: 0,
				format: 0,
				region: 0,
				vst: null
			}
		};

		return filter;
	}
})();
