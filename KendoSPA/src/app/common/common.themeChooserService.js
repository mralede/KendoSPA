(function () {
	'use strict';

	angular
	  .module('kendoSpa.common')
	  .factory('themeChooserService', themeChooserService);

	/** @ngInject */
	function themeChooserService(localStorageService) {

		var data = {
			themes: [
				{id: "black", name: "Black"},
				{id: "blueopal", name: "Blue Opal"},
				{id: "default", name: "Default"},
				{id: "metroblack", name: "Metro Black"},
				{id: "silver", name: "Silver"}
			]
		};

		var service = {
			getTheme: getTheme,
			setTheme: setTheme,

			themes : data.themes
		};

		return service;

		function getTheme() {
			return localStorageService.get("theme");
		};

		function setTheme(theme, animate) {
			localStorageService.set("theme", theme);

			changeTheme(theme, !!animate);
		};

		function changeTheme(skinName, animate) {
			var doc = document,
				kendoLinks = $("link[href*='kendo.']", doc.getElementsByTagName("head")[0]),
				commonLink = kendoLinks.filter("[href*='kendo.common']"),
				skinLink = kendoLinks.filter(":not([href*='kendo.common'])"),
				href = location.href,
				skinRegex = /kendo\.\w+(\.min)?\.css/i,
				extension = skinLink.attr("rel") === "stylesheet" ? ".css" : ".less",
				url = commonLink.attr("href").replace(skinRegex, "kendo." + skinName + "$1" + extension),
				exampleElement = $("#example");

			function preloadStylesheet(file, callback) {
				var element = $("<link rel='stylesheet' media='print' href='" + file + "'/>").appendTo("head");

				setTimeout(function () {
					callback();
					element.remove();
				}, 100);
			}

			function replaceTheme() {
				var oldSkinName = $(doc).data("kendoSkin"),
					newLink;

				if ($.browser && $.browser.msie) {
					newLink = $(doc.createStyleSheet(url));
				} else {
					newLink = skinLink.eq(0).clone().attr("href", url);
					skinLink.eq(0).before(newLink);
				}

				skinLink.remove();

				$(doc.documentElement).removeClass("k-" + oldSkinName).addClass("k-" + skinName);
			}

			if (animate) {
				preloadStylesheet(url, replaceTheme);
			} else {
				replaceTheme();
			}
		};
	}
})();
