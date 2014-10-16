var app = angular.module("app", ['ngSanitize', 'ngAnimate', 'toaster', 'ngRoute']);

app.config(function($httpProvider) {

	var logsOutUserOn401 = function($location, $q, SessionService, FlashService) {
		var success = function(response) {
			return response;
		};

		var error = function(response) {
			if (response.status === 401) {
				SessionService.unset('authenticated');
				$location.path('/');
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

	$routeProvider.when('/', {
		templateUrl: 'templates/login.html',
		controller: 'LoginController'
	});

	$routeProvider.when('/register', {
		templateUrl: 'templates/register.html',
		controller: 'RegisterController'
	});

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

	$routeProvider.when('/user-addedit/:customerID', {
		templateUrl: 'templates/addedit.html',
		controller: 'AddeditController',
		resolve: {
			customer: function(CrudService, $route) {
				var customerID = $route.current.params.customerID;
				return CrudService.getCustomer(customerID);
			}
		}
	});

	$routeProvider.when('/user/create', {
		templateUrl: 'templates/user/create.html',
		controller: 'UserController',
	});

	$routeProvider.when('/user/update/:id', {
		templateUrl: 'templates/user/update.html',
		controller: 'UserController',
		resolve: {

		}
	});

	$routeProvider.when('/user', {
		templateUrl: 'templates/user.html',
		controller: 'UserController',
		resolve: {
			user: function(UserService) {
				return UserService.get();
			}
		}
	});

	$routeProvider.otherwise({
		redirectTo: '/'
	});

	// use the HTML5 History API remove # in url
	//$locationProvider.html5Mode(true);

});

app.run(function($rootScope, $location, AuthenticationService, FlashService) {
	var routesThatRequireAuth = ['/home', '/user/create'];

	$rootScope.$on('$routeChangeStart', function(event, next, current) {
		if (_(routesThatRequireAuth).contains($location.path()) && !AuthenticationService.isLoggedIn()) {
			$location.path('/login');
			FlashService.show("Please log in to continue.", 'warning');
			FlashService.clear();
		}
	});
});