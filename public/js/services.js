app.factory("UserPrefix", function($scope) {
	return {
		get: function() {
			return $scope;

		}
	}
});

app.factory("UserService", function($http) {
	return {
		get: function() {
			return $http.get('user');
		}
	};
});

app.factory("BookService", function($http) {
	return {
		get: function() {
			return $http.get('books');
		}
	};
});

app.factory("ProfileService", function($http) {
	return {
		get: function() {
			return $http.get('profile');
		}
	};
});

app.factory("FlashService", function($rootScope) {
	return {
		show: function(message) {
			$rootScope.flash = message;
		},
		clear: function() {
			$rootScope.flash = "";
		}
	}
});

app.factory("SessionService", function() {
	return {
		get: function(key) {
			return sessionStorage.getItem(key);
		},
		set: function(key, val) {
			return sessionStorage.setItem(key, val);
		},
		unset: function(key) {
			return sessionStorage.removeItem(key);
		}
	}
});

app.filter('offset', function() {
	return function(input, start) {
		start = parseInt(start, 10);
		return input.slice(start);
	};
});



app.factory("AuthenticationService", function($http, $sanitize, SessionService, FlashService, CSRF_TOKEN) {

	var cacheSession = function() {
		SessionService.set('authenticated', true);
	};

	var uncacheSession = function() {
		SessionService.unset('authenticated');
	};

	var loginError = function(response) {
		FlashService.show(response.flash);
	};

	var anyError = function(response) {
		FlashService.show(response.flash);
	};


	var sanitizeCredentials = function(credentials) {
		return {
			email: $sanitize(credentials.email),
			password: $sanitize(credentials.password),
			csrf_token: CSRF_TOKEN,
			remember: credentials.remember,
		};
	};

	return {
		login: function(credentials) {
			var login = $http.post("auth/login", sanitizeCredentials(credentials));
			login.success(cacheSession);
			login.success(FlashService.clear);
			login.error(loginError);
			return login;
		},
		logout: function() {
			var logout = $http.get("auth/logout");
			logout.success(uncacheSession);
			return logout;
		},
		isLoggedIn: function() {
			return SessionService.get('authenticated');
		}
	};
});