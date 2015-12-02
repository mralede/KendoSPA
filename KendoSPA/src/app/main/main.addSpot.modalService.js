(function () {
	'use strict';

	angular
	.module('kendoSpa')
	.factory('addSpotModalService', addSpotModalService)
	.controller('AddSpotModalCtrl', AddSpotModalCtrl);

	/** @ngInject */
	function addSpotModalService($uibModal) {

		function open () {

			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'app/main/addSpot.html',
				controller: 'AddSpotModalCtrl',
				size: "sm",
				resolve: {
					items: function () {
						return ['item1', 'item2', 'item3'];
					}
				}
			});

			return modalInstance.result;

			//modalInstance.result.then(function (selectedItem) {
			//	$scope.selected = selectedItem;
			//}, function () {
			//	$log.info('Modal dismissed at: ' + new Date());
			//});
		};

		return {
			open: open
		}
	}

	/** @ngInject */
	function AddSpotModalCtrl($scope, $uibModalInstance, items) {
		$scope.items = items;

		$scope.selected = {
			item: $scope.items[0]
		};

		$scope.ok = function () {
			var newItem = {
				spotName: "New spot",
				language: "English",
				startDate: "2015/10/1",
				endDate: "2015/10/5",
				stType: "BH;",
				region: "BE;NW;",
				status: 1,
				hc: "",
				vst: "some vst"
			};

			$uibModalInstance.close(newItem);
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	}

})();
