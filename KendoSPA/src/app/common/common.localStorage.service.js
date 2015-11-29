(function () {
	'use strict';

	angular
	  .module('kendoSpa')
	  .factory('localStorageService', localStorageService);

	/** @ngInject */
	function localStorageService($window) {
		var storage = {},
			localStorage = $window.localStorage;

		var set = function (key, value) {
			if (key) {
				storage[key] = value;
				localStorage.setItem(key, value);
			}
		};

		var remove = function (key) {
			if (key && storage[key]) {
				delete storage[key];
				localStorage.removeItem(key);
			}
		};

		var get = function (key) {
			var value = storage[key];
			if (value)
				return value;

			value = localStorage.getItem(key);
			if (value) {
				storage[key] = value;
			}

			return value;
		};

		return {
			get: get,
			set: set,
			remove: remove
		}
	}
})();
