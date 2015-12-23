(function () {
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
			controllerAs: 'navbar',
			bindToController: true,

			transclude: true
		};

		return directive;

		/** @ngInject */
		function NavbarController($scope, $state, Fullscreen, themeChooserService, LOCALES, localizationService, authenticationService) {
			var vm = this;

			$scope.$watch(authenticationService.isAuthenticated, function (isAuthenticated) {
				vm.isAuthenticated = isAuthenticated;

				vm.userName = authenticationService.getUserName();
			});

			vm.logOut = function () {
				authenticationService.logOut();
				$state.go('signIn');

				vm.activeLeft = true;
				vm.activeRight = true;
			};

			vm.toggleFullscreen = function () {
				if (Fullscreen.isEnabled())
					Fullscreen.cancel();
				else
					Fullscreen.all();
			};

			vm.locales = LOCALES.locales;

			localizationService
				.getLocale()
				.then(function (locale) {
					vm.currentLocale = locale;
				});

			vm.changeLocale = function (locale) {
				localizationService.setLocale(locale);
			};

			vm.themes = themeChooserService.themes;
			vm.selectedTheme = themeChooserService.getTheme();

			if (vm.selectedTheme && vm.selectedTheme != 'black')
				themeChooserService.setTheme(vm.selectedTheme, false);

			vm.setTheme = function (theme) {
				vm.selectedTheme = theme;
				themeChooserService.setTheme(theme, true);
			};

			vm.activeLeft = true;
			vm.toggleLeft = function () {
				vm.activeLeft = !vm.activeLeft;
			};

			vm.activeRight = true;
			vm.toggleRight = function () {
				vm.activeRight = !vm.activeRight;
			};
		}
	}


})();

