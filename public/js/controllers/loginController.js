var login = angular.module('LoginCtrl', []);

login.controller('LoginController', function($scope, Login) {

	$scope.loginSubmit = function() {
		var auth = Login.auth($scope.loginData);
		auth.success(function(response) {
			console.log(response);
		});
	}
});