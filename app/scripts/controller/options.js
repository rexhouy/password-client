(function(){

        var OptionsController = function($scope, $mdDialog, $mdToast, PasswordService, ChromeService, SettingsService){

                var init = function() {
                        SettingsService.get().then(function(settings) {
                                $scope.loading = true;
                                PasswordService.all().then(function(response) {
                                        $scope.passwords = response.data;
                                        $scope.loading = false;
                                });
                        }, function() {
                                $scope.settings();
                        });
                };

                var copyToClipboard = function(password) {
                        ChromeService.copy2Clipboard(password.data.plain);
                        $mdToast.show(
                                $mdToast.simple()
                                        .content("copied to clipboard")
                                        .hideDelay(3000)
                        );
                };

                $scope.copy = function(url, event) {
                        PasswordService.find(url).then(copyToClipboard);
                };

                $scope.edit = function(url, event) {
                        $mdDialog.show({
                                controller: EditController,
                                templateUrl: "edit.tmpl.html",
                                locals: { url: url },
                                parent: angular.element(document.body),
                                targetEvent: event,
                                clickOutsideToClose:true
                        }).then(function(answer) {});
                };

                $scope.create = function(event) {
                        $mdDialog.show({
                                controller: CreateController,
                                templateUrl: "new.tmpl.html",
                                parent: angular.element(document.body),
                                targetEvent: event,
                                clickOutsideToClose:true
                        }).then(function(answer) {});
                };

                $scope.confirmDestroy = function(url, event) {
                        $mdDialog.show(
                                $mdDialog.confirm()
                                        .parent(angular.element(document.querySelector("#popupContainer")))
                                        .clickOutsideToClose(true)
                                        .title("CONFIRM")
                                        .content("Really want to delete "+url+"?")
                                        .ok("OK")
                                        .cancel("CANCEL")
                                        .targetEvent(event)
                        ).then(function() {
                                destroy(url);
                        }, function() {
                                // Operation canceled
                        });
                };

                $scope.settings = function(event) {
                        $mdDialog.show({
                                controller: SettingsController,
                                templateUrl: "settings.tmpl.html",
                                parent: angular.element(document.body),
                                targetEvent: event,
                                clickOutsideToClose:true
                        }).then(function(answer) {});
                };

                var destroy = function(url) {
                        $scope.loading = true;
                        PasswordService.destroy(url).then(function() {
                                $scope.passwords = $scope.passwords.filter(function(password) {
                                        return password.url != url;
                                });
                                $scope.loading = false;
                        });
                };

                init();
        };

        var EditController = function($scope, $mdDialog, PasswordService, url) {
                $scope.loading = true;
                PasswordService.find(url).then(function(password){
                        $scope.password = password.data;
                        $scope.loading = false;
                });

                $scope.cancel = function() {
                        $mdDialog.cancel();
                };

                $scope.confirm = function() {
                        $scope.loading= true;
                        PasswordService.update(url, $scope.password.plain, $scope.password.comment).then(function(password){
                                $scope.loading = false;
                                $scope.cancel();
                        });
                };
        };

        var CreateController = function($scope, $mdDialog, PasswordService) {
                $scope.password = {};

                $scope.cancel = function() {
                        $mdDialog.cancel();
                };

                $scope.confirm = function() {
                        $scope.loading= true;
                        PasswordService.create($scope.password.url, $scope.password.plain, $scope.password.comment).then(function(password){
                                $scope.loading = false;
                                $scope.cancel();
                        });
                };
        };

        var SettingsController = function($scope, $mdDialog, SettingsService) {
                SettingsService.get().then(function(settings){
                        $scope.settings = settings;
                }, function() {
                        $scope.settings = {
                                key: "",
                                secret: "",
                                server: ""
                        };
                });

                $scope.cancel = function() {
                        $mdDialog.cancel();
                };
                $scope.confirm = function() {
                        $scope.loading= true;
                        SettingsService.set($scope.settings).then(function(){
                                $scope.loading = false;
                                $scope.cancel();
                        });
                };
        };

        pwdApp.controller("OptionsController", ["$scope", "$mdDialog", "$mdToast", "PasswordService", "ChromeService", "SettingsService", OptionsController])
                .controller("EditController", ["$scope", "$mdDialog", "PasswordService", EditController])
                .controller("SettingsController", ["$scope", "$mdDialog", "SettingsService", SettingsController])
                .controller("CreateController", ["$scope", "$mdDialog", "PasswordService", CreateController]);
})();
