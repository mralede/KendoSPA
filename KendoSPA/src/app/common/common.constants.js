/* global moment:false, kendo:false, $:false, _:false */
(function () {
	'use strict';

	angular
	.module('kendoSpa.common')
	.constant('moment', moment)
	.constant('kendo', kendo)
	.constant('$', $)
	.constant('_', _);
})();
