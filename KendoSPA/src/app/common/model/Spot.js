(function () {
	'use strict';

	angular
		.module('kendoSpa.common')
		.factory('Spot', factory);

	/** @ngInject */
	function factory(kendo) {
		var Spot = kendo.data.Model.define({
			fields: {
				"id": { type: "number" },

				"type": { type: "string" },
				"language": { type: "string" },
				"nameThirdOption": { type: "string" },
				"name": { type: "string" },

				"status": { type: "string" },
				"campaign": { type: "string" },
				"theme": { type: "string" },
				"text": { type: "string" },

				"startDate": { type: "date" },
				"endDate": { type: "date" },

				"hc": { type: "string" },

				"format": { type: "string" },
				"region": { type: "string" },

				"vstType": { type: "string" },
				"vst": { type: "string" }
			},
			spotName: function () {
				return this.get("type") + "_" + this.get("language") + "_" + this.get("nameThirdOption") + "_" + this.get("name");
			}
		});

		//Spot.create = function (data) {
		//	var spot = new Spot();

		//	if (data)
		//		spot.init(data);

		//	return spot;
		//};

		angular.extend(Spot.prototype, {
			update: function (data) {
				this.set("type", data.type);
				this.set("language", data.language);
				this.set("nameThirdOption", data.nameThirdOption);
				this.set("name", data.name);

				this.set("status", data.status);
				this.set("campaign", data.campaign);
				this.set("theme", data.theme);
				this.set("text", data.text);

				this.set("startDate", data.startDate);
				this.set("endDate", data.endDate);

				this.set("hc", data.hc);

				this.set("format", data.format || "");

				this.set("region", data.region || "");

				this.set("vstType", data.vstType || "");
				this.set("vst", data.vst);

				this.files = data.files || [];
			},

			getData: function () {
				return {
					id: this.get("id"),

					type: this.get("type"),
					language: this.get("language"),
					nameThirdOption: this.get("nameThirdOption"),
					name: this.get("name"),

					status: this.get("status"),
					campaign: this.get("campaign"),
					theme: this.get("theme"),
					text: this.get("text"),

					startDate: this.get("startDate"),
					endDate: this.get("endDate"),

					hc: this.get("hc"),

					format: this.get("format"),

					region: this.get("region"),

					vstType: this.get("vstType"),
					vst: this.get("vst"),

					files: this.files
				}
			},

			clone: function () {
				var spot = new Spot(this.getData());

				return spot;
			}
		});

		return Spot;
	}

})();
