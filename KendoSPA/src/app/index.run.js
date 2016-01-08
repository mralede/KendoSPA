(function() {
  'use strict';

  angular
	.module('kendoSpa')
	.run(runBlock);

  /** @ngInject */
  function runBlock($document) {

	$document.bind("drop dragover", function (e) {
		e.preventDefault();
		return false;
	});
  }

})();
