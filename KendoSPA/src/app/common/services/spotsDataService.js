(function () {
	'use strict';

	angular
	  .module('kendoSpa.common')
	  .factory('spotsDataService', spotsDataService);

	/** @ngInject */
	function spotsDataService(kendo, _, Spot) {
		var data = {
			spots: new kendo.data.ObservableArray([])
		};

		function getSpots() {
			return data.spots;
		}

		function getSpot(id) {
			return _.find(data.spots, function (item) {
				return item.id == id;
			});
		}

		function updateSpot(data) {
			var spot = getSpot(data.id);

			if (spot)
				update(spot, data);
		}

		function update(spot, data) {
			spot.update(data);
		}

		function addSpot(spot) {
			spot.id = data.spots.length;

			data.spots.push(new Spot(spot));
		}

		function deleteSpot(id) {
			_.each(data.spots, function (spot, idx) {
				if (spot && spot.id == id) {
					data.spots.splice(idx, 1);
					return true;
				}
			});

			return false;
		}

		data.spots = createFakeData();

		return {
			getSpots: getSpots,
			getSpot: getSpot,
			addSpot: addSpot,
			updateSpot: updateSpot,
			deleteSpot: deleteSpot
		}


		function createFakeData() {
			var result = [
				new Spot({
					id: 0,

					type: "N_CH",
					language: "D",
					nameThirdOption: 1210,
					name: "Spot1",

					status: 1,
					campaign: 1,
					theme: null,
					text: null,

					startDate: new Date(2015, 5, 18),
					endDate: new Date(2015, 5, 18),

					hc: null,

					format: "ProntoA",

					region: "NW;BE",

					vstType: "",

					vst: "Some VST"
				}),
				new Spot({
					id: 1,

					type: "N_CH",
					language: "D",
					nameThirdOption: 1210,
					name: "Spot2",

					status: 1,
					campaign: 1,
					theme: null,
					text: null,

					startDate: new Date(2015, 5, 18),
					endDate: new Date(2015, 5, 18),

					hc: null,

					format: "ProntoA",

					region: "NW;BE",

					vstType: "WH",

					vst: "Some VST"
				}),
				new Spot({
					id: 2,

					type: "N_CH",
					language: "D",
					nameThirdOption: 1210,
					name: "Spot3",

					status: 1,
					campaign: 1,
					theme: null,
					text: null,

					startDate: new Date(2015, 5, 18),
					endDate: new Date(2015, 5, 18),

					hc: null,

					format: "ProntoA",

					region: "NW;BE",

					vstType: "WH",

					vst: "Some VST"
				}),
				new Spot({
					id: 3,

					type: "N_CH",
					language: "D",
					nameThirdOption: 1210,
					name: "Spot1",

					status: 1,
					campaign: 1,
					theme: null,
					text: null,

					startDate: new Date(2015, 5, 18),
					endDate: new Date(2015, 5, 18),

					hc: null,

					format: "ProntoA",

					region: "NW;BE",

					vstType: "",

					vst: "Some VST"
				}),
				new Spot({
					id: 4,

					type: "N_CH",
					language: "D",
					nameThirdOption: 1210,
					name: "Spot2",

					status: 1,
					campaign: 1,
					theme: null,
					text: null,

					startDate: new Date(2015, 5, 18),
					endDate: new Date(2015, 5, 18),

					hc: null,

					format: "ProntoA",

					region: "NW;BE",

					vstType: "WH",

					vst: "Some VST"
				}),
				new Spot({
					id: 5,

					type: "N_CH",
					language: "D",
					nameThirdOption: 1210,
					name: "Spot3",

					status: 1,
					campaign: 1,
					theme: null,
					text: null,

					startDate: new Date(2015, 5, 18),
					endDate: new Date(2015, 5, 18),

					hc: null,

					format: "ProntoA",

					region: "NW;BE",

					vstType: "WH",

					vst: "Some VST"
				}),
				new Spot({
					id: 6,

					type: "N_CH",
					language: "D",
					nameThirdOption: 1210,
					name: "Spot1",

					status: 1,
					campaign: 1,
					theme: null,
					text: null,

					startDate: new Date(2015, 5, 18),
					endDate: new Date(2015, 5, 18),

					hc: null,

					format: "ProntoA",

					region: "NW;BE",

					vstType: "",

					vst: "Some VST"
				}),
				new Spot({
					id: 7,

					type: "N_CH",
					language: "D",
					nameThirdOption: 1210,
					name: "Spot2",

					status: 1,
					campaign: 1,
					theme: null,
					text: null,

					startDate: new Date(2015, 5, 18),
					endDate: new Date(2015, 5, 18),

					hc: null,

					format: "ProntoA",

					region: "NW;BE",

					vstType: "WH",

					vst: "Some VST"
				}),
				new Spot({
					id: 8,

					type: "N_CH",
					language: "D",
					nameThirdOption: 1210,
					name: "Spot3",

					status: 1,
					campaign: 1,
					theme: null,
					text: null,

					startDate: new Date(2015, 5, 18),
					endDate: new Date(2015, 5, 18),

					hc: null,

					format: "ProntoA",

					region: "NW;BE",

					vstType: "WH",

					vst: "Some VST"
				}),

			];

			return new kendo.data.ObservableArray(result);
		}
	}
})();
