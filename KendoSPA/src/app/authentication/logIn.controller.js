(function () {
	'use strict';

	angular
	  .module('kendoSpa')
	  .controller('LogInController', LogInController);

	/** @ngInject */
	function LogInController($state, authenticationService) {
		var vm = this;

		vm.user = {
			name: null,
			password: null,
			remember: false
		};

		vm.submit = function () {
			if (vm.signIn.$invalid)
				return;

			authenticationService.logIn(vm.user);

			if (authenticationService.isAuthenticated())
				$state.go('home');
		}
	}
})();
