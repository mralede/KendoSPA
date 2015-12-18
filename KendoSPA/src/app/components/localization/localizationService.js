(function () {
	'use strict';

	angular
	.module('kendoSpa')
	.factory('localizationService', localizationService);

	/** @ngInject */
	function localizationService($q, $translate, LOCALES, $rootScope, kendo, tmhDynamicLocale, localStorageService) {
		var data = {
			currentLocale: null //$translate.use() || LOCALES.preferredLocale
		};

		function toKendoLocale(locale) {
			return locale.replace(/_/g, '-');
		}

		function setLocale (locale) {
			//data.currentLocale = locale;

			localStorageService.set("LOCALE", locale);

			$translate.use(locale);

			data.currentLocale = loadKendoLocale(locale);

			return data.currentLocale;
		}

		function getLocale() {
			return data.currentLocale;
		}

		// EVENTS
		// on successful applying translations by angular-translate
		$rootScope.$on('$translateChangeSuccess', function (event, data) {
			document.documentElement.setAttribute('lang', data.language);// sets "lang" attribute to html

			//// asking angular-dynamic-locale to load and apply proper AngularJS $locale setting
			//tmhDynamicLocale.set(data.language.toLowerCase().replace(/_/g, '-'));
		});

		function loadKendoLocale(locale) {
			var deferred = $q.defer(),
				kendoLocale = toKendoLocale(locale);

			$.getScript("kendo-messages/kendo.messages." + kendoLocale + ".min.js")
				.done(function () {
					kendo.culture(kendoLocale); /* change kendo culture */

					$rootScope.$broadcast("kendoLocaleChanged", {
						locale: kendoLocale
					});

					deferred.resolve(locale);
				})
				.fail(function () {
					deferred.resolve(locale);
				});

			return deferred.promise;
		}

		setLocale(localStorageService.get("LOCALE") || LOCALES.preferredLocale);

		return {
			getLocale: getLocale,
			setLocale: setLocale
		};
	}
})();
