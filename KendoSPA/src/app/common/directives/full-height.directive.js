(function () {
	'use strict';

	angular
	.module('kendoSpa.common')
	.directive('fullHeight', fullHeight)
	.directive('fullHeightContainer', fullHeightContainer);

	/** @ngInject */
	function fullHeightContainer() {
		var directive = {
			restrict: 'A',
			scope: {
			},
			controller: ["$scope", "$element", "$window", function ($scope, $element, $window) {
				this.getHeight = function () {
					if (!$scope.height) {
						$scope.height = this.calculateHeight();
					}
					
					return $scope.height;
				};

				this.calculateHeight = function () {
					var win = angular.element($window);

					return Math.max(win.height(), win.innerHeight()) - Math.max($element.height(), $element.innerHeight());
				};
			}]
		};

		return directive;
	}

	/** @ngInject */
	function fullHeight($window, $) {
		var directive = {
			restrict: 'A',
			require: "^^fullHeightContainer",
			scope: {
				fullHeightDelta: '=',
				minHeight: '='
			},
			link: function (scope, element, attrs, fullHeightContainerCtrl) {
				var delta = scope.fullHeightDelta || 0,
					minHeight = scope.minHeight || 200;

				var newHeight = fullHeightContainerCtrl.getHeight() - delta;

				if (newHeight < minHeight)
					newHeight = minHeight;

				element.css('height', newHeight);
			}
		};

		return directive;
	}
})();
