(function($){

	pwdApp.service("ChromeService", ["$q", function($q) {
		var self = this;
		
		self.copy2Clipboard = function(text) {
			var copyFrom = $("<textarea/>");
			copyFrom.text(text);
			$("body").append(copyFrom);
			copyFrom.select();
			document.execCommand("copy");
			copyFrom.remove();
		};

		self.getHost = function() {
			var d = $q.defer();
			chrome.tabs.getSelected(null, function(tab) {
				var matched = tab.url.match(/^http[s]?:\/\/(([\w-]+\.)+([\w-]+))\//);
				if (matched && matched[1]) {
					var domainList = matched[1].split(".");
					if (domainList.length > 2) {
						domainList.shift();
					}
					d.resolve(domainList.join("."));
				} else {
					d.reject("parse url error ["+tab.url+"]");
				}
			});
			return d.promise;
		};
		
		return self;
	}]);

}(jQuery));
