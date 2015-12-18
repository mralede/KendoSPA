(function () {
	'use strict';

	angular
		.module('kendoSpa')
		.config(routerConfig);

	/** @ngInject */
	function routerConfig($stateProvider, $urlRouterProvider) {
		$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'app/main/main.html',
			controller: 'MainController',
			controllerAs: 'main',
			resolve: {
				locale: ["localizationService", function (localizationService) {
					return localizationService.getLocale();
				}]
			}
		})
		.state('playlists', {
			url: '/playlists',
			templateUrl: 'app/playlists/playlists.html',
			controller: 'PlaylistsController',
			controllerAs: 'playlists',
			resolve: {
				locale: ["localizationService", function (localizationService) {
					return localizationService.getLocale();
				}]
			}
		});

		$urlRouterProvider.otherwise('/');
	}

})();
