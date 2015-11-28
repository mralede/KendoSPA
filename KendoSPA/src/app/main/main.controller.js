(function() {
  'use strict';

  angular
    .module('kendoSpa')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr, spotsFilterService) {
    var vm = this;

    function onDateChange() {
    	console.log(vm.spotsFilter);
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

    vm.spotsFilter = spotsFilterService;

    console.log(vm.spotsFilter);
  }
})();
