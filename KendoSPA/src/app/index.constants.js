/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('kendoSpa')
	.constant('LOCALES', {
		'locales': [
			{ id: "de_DE", name: "Deutsch", flag: "flag-DE" },
			{ id: "en_US", name: "English", flag: "flag-GB" },
			{ id: "fr_FR", name: "Französisch", flag: "flag-FR" },
			{ id: "it_IT", name: "Italienisch", flag: "flag-IT" }
		],
		'preferredLocale': 'de-DE'
	})
    .constant('malarkey', malarkey)
    .constant('moment', moment);

})();
