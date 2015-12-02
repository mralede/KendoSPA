﻿(function () {
	'use strict';

	angular
	  .module('kendoSpa.common')
	  .factory('uiDataSourcesService', uiDataSourcesService);

	/** @ngInject */
	function uiDataSourcesService($q, $translate) {

		function getHcDataSource() {
			return $translate(['Alle', 'Aktive', 'Inaktive'])
				.then(function (translations) {
					return [
						{ id: 0, name: "Alle" },
						{ id: 1, name: "Option 1" },
						{ id: 2, name: "Option 2" }
					];
				});
		}

		function getStatusDataSource() {
			return $translate(['Alle', 'Aktive', 'Inaktive']).then(function (translations) {
				return [
					{ id: 0, name: translations.Alle },
					{ id: 1, name: translations["Aktive"] },
					{ id: 2, name: translations["Inaktive"] }
				];
			});
		}

		function getCategoriesDataSource() {
			return $translate(['Alle', 'Aktive', 'Inaktive']).then(function (translations) {
				return [
					{ id: 0, name: "Alle" },
					{ id: 1, name: "Image" },
					{ id: 2, name: "National" },
					{ id: 3, name: "Image & National" },
					{ id: 4, name: "Bau & Hobby" },
					{ id: 5, name: "Warenhaus" },
					{ id: 6, name: "Regional" },
					{ id: 7, name: "Regional BE" },
					{ id: 8, name: "Regional NWZZ" },
					{ id: 9, name: "Regional OT" },
					{ id: 10, name: "Regional SR" },
					{ id: 11, name: "Extern" },
					{ id: 12, name: "Pronto" }
				];
			});
		}

		function getLanguageDataSource() {
			return $translate(['Alle', 'Deutsch', 'Französisch', "Italienisch"]).then(function (translations) {
				return [
					{ id: 0, name: translations["Alle"] },
					{ id: 1, name: translations["Deutsch"] },
					{ id: 2, name: translations["Französisch"] },
					{ id: 3, name: translations["Italienisch"] }
				];
			});
		}

		function getRegioDataSource() {
			return $translate(['Alle', 'Deutsch', 'Französisch', "Italienisch"]).then(function (translations) {
				return [
					{ id: 0, name: "Alle" },
					{ id: 1, name: "BE" },
					{ id: 2, name: "NWZZ" },
					{ id: 3, name: "OT" },
					{ id: 4, name: "SR" },
					{ id: 5, name: "TOEL" }
				];
			});
		}

		function getFormatDataSource() {
			return $q.when([
				{ id: 0, name: "Alle" },
				{ id: 1, name: "A" },
				{ id: 2, name: "B" },
				{ id: 3, name: "C" },
				{ id: 4, name: "M" },
				{ id: 5, name: "BH" },
				{ id: 6, name: "WH" },
				{ id: 7, name: "ProntoA" },
				{ id: 8, name: "ProntoB" },
				{ id: 9, name: "ProntoC" },
				{ id: 10, name: "ProntoD" }
			]);
		}

		return {
			getHcDataSource: getHcDataSource,
			getStatusDataSource: getStatusDataSource,
			getCategoriesDataSource: getCategoriesDataSource,
			getLanguageDataSource: getLanguageDataSource,
			getRegioDataSource: getRegioDataSource,
			getFormatDataSource: getFormatDataSource
		}
	}
})();
