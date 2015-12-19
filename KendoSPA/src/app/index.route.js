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
				}],
				authenticate: ["$q", "authenticationService", "$state", "$timeout", authenticate]
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
				}],
				authenticate: ["$q", "authenticationService", "$state", "$timeout", authenticate]
			}
		})
		.state('signIn', {
			url: '/signin',
			templateUrl: 'app/authentication/logIn.html',
			controller: 'LogInController',
			controllerAs: 'logIn',
			resolve: {
				anonymous: ["$q", "authenticationService", "$state", "$timeout", anonymous]
			}
		});

		$urlRouterProvider.otherwise('/');

		function authenticate($q, authenticationService, $state, $timeout) {
			if (authenticationService.isAuthenticated()) {
				// Resolve the promise successfully
				return $q.when()
			} else {
				// The next bit of code is asynchronously tricky.

				$timeout(function () {
					// This code runs after the authentication promise has been rejected.
					// Go to the log-in page
					$state.go('signIn')
				})

				// Reject the authentication promise to prevent the state from loading
				return $q.reject()
			}
		}

		function anonymous($q, authenticationService, $state, $timeout) {
			if (!authenticationService.isAuthenticated()) {
				return $q.when()
			} else {
				$timeout(function () {
					$state.go('home')
				})

				return $q.reject()
			}
		}

	}

})();
