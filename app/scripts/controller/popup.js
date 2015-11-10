'use strict';
(function(){

	window.pwdApp = angular.module("pwdApp", ["ngMaterial"]).config(function($mdThemingProvider) {
		$mdThemingProvider.theme("default")
			.primaryPalette("amber")
			.accentPalette("indigo");
	});

	var PopupController = function($scope, PasswordService, ChromeService, SettingsService){

		$scope.enableSpecial = true;
		$scope.length = 16;
		$scope.loading = true;

		var search = function(url) {
			$scope.url = url;
			PasswordService.find(url).then(function(password) {
				if (password.data.url) {
					ChromeService.copy2Clipboard(password.data.plain);
					$scope.close();
				} else {
					// Need create one
					$scope.loading = false;
				}
			});
		};

		var fatal = function() {
			alert("cannot handle this site");
			$scope.close();
		};
		
		var init = function() {
			SettingsService.get("key").then(function() {
				ChromeService.getHost().then(search, fatal);
			}, function() {
				// no setting data
				chrome.tabs.create({ "url": "chrome-extension://"+chrome.runtime.id+"/options.html" });
			});
		};
		init();

		$scope.close = function() {
			window.close();
		};

		$scope.create = function() {
			$scope.loading = true;
			PasswordService.random($scope.url, $scope.enableSpecial, $scope.length).then(function(password) {
				ChromeService.copy2Clipboard(password.data.plain);
				$scope.close();
			});
		};

	};
	
	pwdApp.controller("PopupController", ["$scope", "PasswordService", "ChromeService", "SettingsService", PopupController]);


})();
