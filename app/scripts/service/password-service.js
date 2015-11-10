(function() {

        pwdApp.service("PasswordService", ["$http", "SettingsService", function($http, SettingsService) {
                var self = this;

                self.find = function(url) {
                        return SettingsService.get()
                                .then(function(settings) {
                                        return $http({
                                                method: "POST",
                                                url: settings.server+"password/find",
                                                data: { url: url, key: settings.key },
                                                secret: settings.secret
                                        });
                                });
                };

                self.random = function(url, enable_special, length) {
                        return SettingsService.get()
                                .then(function(settings) {
                                        return $http({
                                                method: "POST",
                                                url: settings.server+"password/random",
                                                data: {
                                                        url: url,
                                                        key: settings.key,
                                                        enable_special: enable_special,
                                                        length: length,
                                                        secret: settings.secret
                                                }
                                        });
                                });
                };

                self.create = function(url, plain, comment) {
                        return SettingsService.get()
                                .then(function(settings) {
                                        return $http({
                                                method: "POST",
                                                url: settings.server+"password",
                                                data: {
                                                        url: url,
                                                        key: settings.key,
                                                        plain: plain,
                                                        comment: comment,
                                                        secret: settings.secret
                                                }
                                        });
                                });
                };

                self.update = function(url, plain, comment) {
                        return SettingsService.get()
                                .then(function(settings) {
                                        return $http({
                                                method: "PUT",
                                                url: settings.server+"password",
                                                data: {
                                                        url: url,
                                                        key: settings.key,
                                                        plain: plain,
                                                        comment: comment,
                                                        secret: settings.secret
                                                }
                                        });
                                });
                };

                self.destroy = function(url) {
                        return SettingsService.get()
                                .then(function(settings) {
                                        return $http({
                                                method: "DELETE",
                                                url: settings.server+"password",
                                                data: {
                                                        url: url,
                                                        secret: settings.secret
                                                }
                                        });
                                });
                };

                self.all = function() {
                        return SettingsService.get()
                                .then(function(settings) {
                                        return $http({
                                                method: "GET",
                                                url: settings.server+"password",
                                                secret: settings.secret
                                        });
                                });
                };

                return self;

        }]);

})();
