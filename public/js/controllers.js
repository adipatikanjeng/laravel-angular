app.controller("ApplicationController", function($http, $scope, $location, FlashService, SessionService, AuthenticationService) {
	$scope.title = SessionService.get('userName');
	$http.get("user/show/" + SessionService.get('userId')).success(function(response) {
		$scope.userName = response.first_name + " " + response.last_name;
		$scope.userId = response.id;

	});

	$scope.isLoggedIn = function() {
		return AuthenticationService.isLoggedIn();
	};

	$scope.login = function() {
		$location.path('/login');
	};

	$scope.logout = function() {
		AuthenticationService.logout().success(function(response) {
			FlashService.show(response.flash, 'success');
			$location.path('/login');
		});
	};
});

app.controller("WelcomeController", function($location, SessionService) {

	if (SessionService.get('authenticated'))
		$location.path('/home');
});

app.controller("LoginController", function($scope, $location, AuthenticationService, SessionService, $routeParams, $rootScope, FlashService) {

	$scope.credentials = {
		email: "",
		password: "",
		remember: ""
	};

	$scope.login = function() {
		AuthenticationService.login($scope.credentials).success(function(results) {
			SessionService.set('userId', results.user.id);
			SessionService.set('role', results.role);
			FlashService.show(results.flash, 'success');
			//$rootScope.currentUser = results.first_name;
			if ($routeParams.nextUrl) {
				$location.path($routeParams.nextUrl);
				$location.url($location.path());
			} else {
				$location.path('/home');
			}
		});
	};
});

app.controller("RegisterController", function($http, $scope, $location, FlashService) {
	$scope.register = function() {
		$http.post("auth/register", $scope.user).success(function(response) {
			$location.path('/');
			FlashService.show(response.flash, 'success');
		}).error(function(response) {
			FlashService.show(response.flash, 'error');
		});
	};
});

app.controller("ResetController", function($http, $scope, $location, FlashService) {
	$scope.requestReset = function() {
		$http.post("auth/reset", $scope.user).success(function(response) {
			$location.path('/');
			FlashService.show(response.flash, 'success');
		}).error(function(response) {
			FlashService.show(response.flash, 'warning');
		});
	};
});

app.controller("ResetPageController", function($http, $scope, $location, $routeParams, AuthenticationService, FlashService) {
	$scope.resetPassword = function() {
		var data = $scope.user;
		FlashService.clear;
		$http.post("auth/resetPassword/" + $routeParams.token, data).success(function(response) {
			$location.path('/');
			FlashService.show(response.flash, 'success');
		});
	};
});


app.controller("UserController", function($scope, $http, FlashService, user, $route, $filter, CrudService, $location, $routeParams, SelectService, $window) {

	$scope.create = function() {
		CrudService.create('user/create', $scope.user).success(function(response) {
			FlashService.show(response.flash, 'success');
			$location.path('user/lists');
		}).error(function(response) {
			FlashService.show(response.flash, 'warning');
		});
	}
	$scope.user = angular.copy(user.data);
	$scope.update = function() {
		CrudService.update('user/update', $routeParams.id, $scope.user).success(function(response) {
			FlashService.show(response.flash, 'success');
			$window.history.back();
		}).error(function(response) {
			FlashService.show(response.flash, 'warning');
		});

	}

	$scope.users = angular.copy(user.data);

	$scope.remove = function(id) {
		if (confirm('Are you sure to delete?')) {
			CrudService.destroy('user/destroy', id).success(function(response) {
				FlashService.show(response.flash, 'success');
				$route.reload();
			}).error(function(response) {
				FlashService.show(response.flash, 'warning');
			});
		}
	}


	$scope.filterFunction = function(element) {
		return element.first_name.match() ? true : false;
	};

	$scope.itemsPerPage = 3;
	$scope.currentPage = 0;

	$scope.range = function() {
		var rangeSize = 2;
		var ret = [];
		var start;

		start = $scope.currentPage;
		if (start > $scope.pageCount() - rangeSize) {
			start = $scope.pageCount() - rangeSize + 1;
		}

		for (var i = start; i < start + rangeSize; i++) {
			ret.push(i);
		}
		return ret;
	};

	$scope.prevPage = function() {
		if ($scope.currentPage > 0) {
			$scope.currentPage--;
		}
	};

	$scope.prevPageDisabled = function() {
		return $scope.currentPage === 0 ? "disabled" : "";
	};

	$scope.pageCount = function() {
		return Math.ceil($scope.users.length / $scope.itemsPerPage) - 1;
	};

	$scope.nextPage = function() {
		if ($scope.currentPage < $scope.pageCount()) {
			$scope.currentPage++;
		}
	};

	$scope.nextPageDisabled = function() {
		return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
	};

	$scope.setPage = function(n) {
		$scope.currentPage = n;
	};

});


app.controller("HomeController", function($http, $scope, $location, AuthenticationService, SessionService, $rootScope) {

	$scope.message = "Mouse Over these images to see a directive at work!";

	$scope.logout = function() {
		AuthenticationService.logout().success(function() {
			$location.path('/');
		});
	};
});

app.controller('ConfirmController', function($http, $routeParams, $location, FlashService) {
	var data = $routeParams;
	$http.post("auth/confirm", data).success(function(response) {
		$location.path('/');
		FlashService.show(response.flash);
	});
});

app.controller("LogoutController", function($http, $scope, $location, AuthenticationService, SessionService) {
	AuthenticationService.logout().success(function() {

		FlashService.show(response.flash, 'success');
		$location.path('/login');
	});

});