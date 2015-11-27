(function() {
  'use strict';

  angular
    .module('kendoSpa')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'A',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true,

      transclude: true,
      link: function (scope, element, attrs) {
      	$("#menu-toggle-left").click(function (e) {
      		e.preventDefault();
      		$("#wrapper").toggleClass("active-left");
      	});

      	$("#menu-toggle-right").click(function (e) {
      		e.preventDefault();
      		$("#wrapper").toggleClass("active-right");
      	});
      }
    };

    return directive;

    /** @ngInject */
    function NavbarController(moment) {
      var vm = this;

      // "vm.creation" is avaible by directive option "bindToController: true"
      vm.relativeDate = moment(vm.creationDate).fromNow();
    }
  }


})();

