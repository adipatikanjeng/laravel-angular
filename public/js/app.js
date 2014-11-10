var app = angular.module("app", ['ngSanitize', 'ngAnimate', 'toaster', 'ngRoute', 'ui.router']);

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

app.config(function($routeProvider, $locationProvider, $stateProvider) {

	$routeProvider.when('/', {
		templateUrl: 'templates/welcome.html',
		controller: 'WelcomeController'
	});

	$routeProvider.when('/login', {
		templateUrl: 'templates/auth/login.html',
		controller: 'LoginController'
	});

	$routeProvider.when('/register', {
		templateUrl: 'templates/auth/register.html',
		controller: 'RegisterController'
	});

	$routeProvider.when('/confirm/:code', {
		templateUrl: 'templates/auth/confirm.html',
		controller: 'ConfirmController'
	});

	$routeProvider.when('/reset', {
		templateUrl: 'templates/auth/reset.html',
		controller: 'ResetController'
	});

	$routeProvider.when('/reset/:token', {
		templateUrl: 'templates/auth/resetPage.html',
		controller: 'ResetPageController'
	});

	$routeProvider.when('/logout', {
		controller: 'LogoutController'
	});

	//home page

	$routeProvider.when('/home', {
		templateUrl: 'templates/home.html',
		controller: 'HomeController'
	});


	$routeProvider.when('/user/create', {
		templateUrl: 'templates/user/create.html',
		controller: 'UserController',
		resolve: {
			user: function() {
				return '';
			}
		}
	});

	$routeProvider.when('/user/update/:id', {
		templateUrl: 'templates/user/update.html',
		controller: 'UserController',
		resolve: {
			user: function(SelectService, $route) {
				return SelectService.get('user/show', $route.current.params.id);
			}
		}
	});

	$routeProvider.when('/user/show/:id', {
		templateUrl: 'templates/user/show.html',
		controller: 'UserController',
		resolve: {
			user: function(SelectService, $route) {
				return SelectService.get('user/show', $route.current.params.id);
			}
		}
	});

	$routeProvider.when('/user/lists', {
		templateUrl: 'templates/user/list.html',
		controller: 'UserController',
		resolve: {
			user: function(SelectService) {
				return SelectService.all('user/lists');
			}
		}
	});

	$routeProvider.otherwise({
		redirectTo: '/'
	});

	// use the HTML5 History API remove # in url
	//$locationProvider.html5Mode(true);

	$stateProvider
		.state('home', {
			url: "/home",
			views: {
				logout: {
					template: '<span ng-click="logout()" class="glyphicon glyphicon-off">',
					controller: function($scope) {}
				},
			}
		});

});

app.run(function($rootScope, $location, AuthenticationService, FlashService) {
	var routesThatRequireAuth = ['/home', '/user/create', '/user/update/:id', '/user/lists'];

	$rootScope.$on('$routeChangeStart', function(event, next, current) {
		if (_(routesThatRequireAuth).contains($location.path()) && !AuthenticationService.isLoggedIn()) {
			var nextUrl = $location.path();
			$location.path('/login');
			$location.search('nextUrl', nextUrl);

			FlashService.show("Please log in to continue.", 'warning');
			FlashService.clear();
		}
	});
});