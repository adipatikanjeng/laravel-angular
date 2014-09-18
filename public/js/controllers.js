app.controller("LoginController", function($scope, $location, AuthenticationService, FlashService, SessionService) {
	if (SessionService.get('authenticated'))
		$location.path('/home');
	$scope.credentials = {
		email: "",
		password: "",
		remember: ""
	};

	$scope.login = function() {
		AuthenticationService.login($scope.credentials).success(function() {
			$location.path('/home');
		});
	};
});

app.controller("RegisterController", function($http, $scope, $location, FlashService) {
	$scope.register = function() {
		$http.post("auth/register", $scope.user).success(function(response) {
			$location.path('/');
			FlashService.show(response.flash);
		}).error(function(response) {
			FlashService.show(response.flash);
		});
	};
});

app.controller("ResetController", function($http, $scope, $location, FlashService) {
	$scope.requestReset = function() {
		$http.post("auth/reset", $scope.user).success(function(response) {
			$location.path('/');
			FlashService.show(response.flash);
		}).error(function(response) {
			FlashService.show(response.flash);
		});
	};
});

app.controller("ResetPageController", function($http, $scope, $location, $routeParams, AuthenticationService, FlashService) {
	$scope.resetPassword = function() {
		var data = $scope.user;
		FlashService.clear;
		$http.post("auth/resetPassword/" + $routeParams.token, data).success(function(response) {
			$location.path('/');
			FlashService.show(response.flash);
		});
	};
});

app.controller("BooksController", function($scope, books) {
	$scope.books = books.data;
});

app.controller("ProfileController", function($scope, profile, $http, FlashService) {

	$scope.update = function() {
		$http.post('user/update/' + profile.data.id, $scope.profile).success(function(response) {
			FlashService.show(response.flash);
		}).error(function(response) {
			FlashService.show(response.flash);
		});
	}
	$scope.profile = profile.data;

});

app.controller("UserController", function($scope, user, $http, FlashService, $route, $filter) {

	$scope.save = function() {
		$http.post('user/create', $scope.user).success(function(response) {
			FlashService.show(response.flash);
			$route.reload();
		}).error(function(response) {
			FlashService.show(response.flash);
		});
	}

	$scope.remove = function(id) {
		$http.post('user/destroy/' + id).success(function(response) {
			FlashService.show(response.flash);
			$route.reload();
		}).error(function(response) {
			FlashService.show(response.flash);
		});
	}

	$scope.update = function(id) {
		$http.post('user/update/' + id, $scope.user).success(function(response) {
			FlashService.show(response.flash);
			$route.reload();
		}).error(function(response) {
			FlashService.show(response.flash);
		});
	}

	$scope.users = user.data;

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


app.controller("HomeController", function($http, $scope, $location, AuthenticationService, SessionService) {
	$scope.title = "Awesome Home";
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