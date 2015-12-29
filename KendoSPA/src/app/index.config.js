(function() {
  'use strict';

  angular
	.module('kendoSpa')
	.config(config);

  /** @ngInject */
  function config($logProvider, $translateProvider, tmhDynamicLocaleProvider, toastrConfig) {
	// Enable log
	$logProvider.debugEnabled(true);



	$translateProvider.useMissingTranslationHandlerLog();

	$translateProvider.useStaticFilesLoader({
		prefix: 'resources/locale-',// path to translations files
		suffix: '.json'// suffix, currently- extension of the translations
	});
	$translateProvider.preferredLanguage('de_DE');// is applied on first load
	$translateProvider.useLocalStorage();// saves selected language to localStorage

	tmhDynamicLocaleProvider.localeLocationPattern('angular-i18n/angular-locale_{{locale}}.js');

	// Set options third-party lib
	toastrConfig.allowHtml = true;
	toastrConfig.timeOut = 3000;
	toastrConfig.positionClass = 'toast-top-right';
	toastrConfig.preventDuplicates = true;
	toastrConfig.progressBar = true;
  }

})();
