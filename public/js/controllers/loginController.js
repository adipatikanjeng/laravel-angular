var login = angular.module('LoginCtrl', []);

login.controller('LoginController', function($scope, $location, Login, SessionService) {

	$scope.loginSubmit = function() {
		var auth = Login.auth($scope.loginData);
		auth.success(function(response) {
			if (response.id) {
				alert('true');
				SessionService.set('auth', true); //This sets our session key/val pair as authenticated
			} else alert('could not verify your login');
		});
	}
});