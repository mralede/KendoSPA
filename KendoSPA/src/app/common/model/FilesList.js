(function () {
	'use strict';

	angular
		.module('kendoSpa.common')
		.factory('FilesList', factory);

	/** @ngInject */
	function factory(_) {
		var FilesList = function (files) {

			this.files = files || [];
		};


		angular.extend(FilesList.prototype, {
			addFiles: function ($files) {
				if ($files && $files.length) {
					for (var i = 0; i < $files.length; i++) {
						this.files.push($files[i]);
					}
				}
			},

			deleteFile: function (file) {
				var self = this;

				_.each(self.files, function (item, idx) {
					if (item && item.name == file.name) {
						self.files.splice(idx, 1);
						return true;
					}
				});

				return false;
			},

			getFiles: function () {
				return _.map(this.files, function (file) { return { name: file.name }; });
			}
		});

		return FilesList;
	}

})();
