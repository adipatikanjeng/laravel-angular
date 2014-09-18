var app = angular.module("app", ['ngSanitize']);

app.config(function($httpProvider) {

	var logsOutUserOn401 = function($location, $q, SessionService, FlashService) {
		var success = function(response) {
			return response;
		};

		var error = function(response) {
			if (response.status === 401) {
				SessionService.unset('authenticated');
				$location.path('/login');
				FlashService.show(response.data.flash);
			}
			return $q.reject(response);
		};

		return function(promise) {
			return promise.then(success, error);
		};
	};

	$httpProvider.responseInterceptors.push(logsOutUserOn401);

});

app.config(function($routeProvider, $locationProvider) {

	//guest page
	$routeProvider.when('/', {
		templateUrl: 'templates/login.html',
		controller: 'LoginController'
	});

	$routeProvider.when('/register', {
		templateUrl: 'templates/register.html',
		controller: 'RegisterController'
	});

	//end guest page

	$routeProvider.when('/confirm/:code', {
		templateUrl: 'templates/confirm.html',
		controller: 'ConfirmController'
	});

	$routeProvider.when('/reset', {
		templateUrl: 'templates/reset.html',
		controller: 'ResetController'
	});

	$routeProvider.when('/reset/:token', {
		templateUrl: 'templates/resetPage.html',
		controller: 'ResetPageController'
	});


	//home page

	$routeProvider.when('/home', {
		templateUrl: 'templates/home.html',
		controller: 'HomeController'
	});

	$routeProvider.when('/user', {
		templateUrl: 'templates/user.html',
		controller: 'UserController',
	});

	$routeProvider.otherwise({
		redirectTo: '/login'
	});


	// use the HTML5 History API remove # in url
	$locationProvider.html5Mode(true);

});

app.run(function($rootScope, $location, AuthenticationService, FlashService) {
	var routesThatRequireAuth = ['/home'];

	$rootScope.$on('$routeChangeStart', function(event, next, current) {
		if (_(routesThatRequireAuth).contains($location.path()) && !AuthenticationService.isLoggedIn()) {
			$location.path('/login');
			FlashService.show("Please log in to continue.");
			FlashService.clear();
		}
	});
});