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
		function NavbarController(moment, Fullscreen, themeChooserService, LOCALES, localizationService) {
			var vm = this;

			vm.toggleFullscreen = function () {
				if (Fullscreen.isEnabled())
					Fullscreen.cancel();
				else
					Fullscreen.all();
			};

			vm.locales = LOCALES.locales;
			vm.currentLocale = localizationService.getLocale();

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


			// "vm.creation" is avaible by directive option "bindToController: true"
			vm.relativeDate = moment(vm.creationDate).fromNow();
		}
	}


})();

