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

			transclude: true,
			link: function (scope, element, attrs) {
				angular.element("#menu-toggle-left").click(function (e) {
					e.preventDefault();
					angular.element("#wrapper").toggleClass("active-left");
				});

				angular.element("#menu-toggle-right").click(function (e) {
					e.preventDefault();
					angular.element("#wrapper").toggleClass("active-right");
				});
			}
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
				$state.go('signIn')
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
		}
	}


})();

