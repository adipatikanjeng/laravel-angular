var app = angular.module('blogApp', [
	'ngRoute',
	//Login
	'LoginCtrl',
	//AuthService
	'AuthSrvc'
]);
app.run(function() {

});

//This will handle all of our routing
app.config(function($routeProvider, $locationProvider) {

	$routeProvider.when('/admin', {
		templateUrl: 'js/templates/login.html',
		controller: 'LoginController'
	}).when('/home', {
		templateUrl: 'js/templates/home.html',
		controller: 'LoginController'
	}).
	otherwise({
		redirectTo: '/'
	});


});