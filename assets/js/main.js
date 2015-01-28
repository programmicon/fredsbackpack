
var Main = (function ($) {
	return {
		browserDetect: function () {
      // Detect if Mac or PC for corresponding download link
      if (navigator.userAgent.indexOf('Mac OS X') != -1) {
        $("body").addClass("mac");
      } else {
        $("body").addClass("pc");
      }
		},
		initMain: function () {
			$(document).ready(function () {
				Main.browserDetect();
			})
		}
	};
// Pass in jQuery.
})(jQuery);

Main.initMain();