(function () {
	'use strict';

	angular
	.module('kendoSpa')
	.factory('editSpotModalService', editSpotModalService)
	.controller('EditSpotModalCtrl', EditSpotModalCtrl);

	/** @ngInject */
	function editSpotModalService($uibModal) {

		function open(spot) {

			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'app/main/editSpot.html',
				controller: 'EditSpotModalCtrl',
				size: "sm",
				resolve: {
					spot: function () {
						return spot;
					}
				}
			});

			return modalInstance.result;
		};

		return {
			open: open
		}
	}

	/** @ngInject */
	function EditSpotModalCtrl($scope, $uibModalInstance, spot) {
		$scope.spot = spot;

		$scope.ok = function () {

			$scope.spot.spotName = "Edited";

			$uibModalInstance.close($scope.spot);
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	}

})();
