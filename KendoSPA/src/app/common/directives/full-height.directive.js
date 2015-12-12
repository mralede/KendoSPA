(function () {
	'use strict';

	angular
	.module('kendoSpa.common')
	.directive('fullHeight', fullHeight);

	/** @ngInject */
	function fullHeight($window, $) {
		var directive = {
			restrict: 'A',
			scope: {
				fullHeightContainer: '@',
				fullHeightDelta: '=',
				minHeight: '=',
				fullHeightTarget: '@'
			},
			link: function (scope, element, attrs) {
				var delta = scope.fullHeightDelta || 0,
					minHeight = scope.minHeight || 200;

				var win = angular.element($window),
					viewportHeight = win.height();

				var container = angular.element(scope.fullHeightContainer),
					containerHeight = container.height();

				var newHeight = viewportHeight - containerHeight - delta;

				if (newHeight < minHeight)
					newHeight = minHeight;

				element.css('height', newHeight);

				var target = scope.fullHeightTarget ? angular.element(scope.fullHeightTarget) : null;
				if (target)
					target.css('height', newHeight);
			}
		};

		return directive;

	}
})();
