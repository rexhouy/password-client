(function() {

        /*
         * {key: "encrypt key", server: "server url", secret: "identity"}
         */
        pwdApp.service("SettingsService", ["$q", function($q) {
                var self = this;

                self.get = function(key) {
                        var d = $q.defer();
                        chrome.storage.local.get(function(data) {
                                if (!!data.key) {
                                        d.resolve(key ? data[key] : data);
                                } else {
                                        d.reject();
                                }
                        });
                        return d.promise;
                };

                self.set = function(data) {
                        if (!data.server.endsWith("/")) {
                                data.server += "/";
                        }
                        var d = $q.defer();
                        chrome.storage.local.set(data, function() {
                                console.log(data);
                                d.resolve(data);
                        });
                        return d.promise;
                };

                return self;
        }]);

})();
