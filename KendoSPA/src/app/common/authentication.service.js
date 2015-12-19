(function () {
	'use strict';

	angular
		.module('kendoSpa.common')
		.factory('authenticationService', authenticationService);

	/** @ngInject */
	function authenticationService(localStorageService) {
		var data = {
			user: null
		};

		function getUserName() {
			if (data.user)
				return data.user.name;

			return null;
		}

		function isAuthenticated() {
			return !!getUserName();
		}

		function logIn(user) {
			if(user){
				data.user = {
					name: user.name
				};

				if (user.remember) {
					localStorageService.set("USER", JSON.stringify(data.user));
				}
			}
		}

		function logOut() {
			data.user = null;
			localStorageService.remove("USER");
		}

		var savedUser = localStorageService.get("USER") || null;
		if (savedUser && typeof savedUser === "string") {
			data.user = JSON.parse(savedUser);
		}

		return {
			getUserName: getUserName,
			isAuthenticated: isAuthenticated,
			logIn: logIn,
			logOut: logOut
		}
	}
})();
