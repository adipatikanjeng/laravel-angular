var login = angular.module('LoginCtrl', []);

login.controller('LoginController', function($scope) {
	$scope.loginSubmit = function() {
		console.dir($scope.loginData);
	}
});