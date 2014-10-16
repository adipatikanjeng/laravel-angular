app.factory("CrudService", function($http) {
	return {
		create: function(url, data) {
			return $http.post(url, data);
		},
		update: function(url, id, data) {			
			return $http.post(url + '/' + id, data);
		},
		destroy: function(url, id) {			
			return $http.post(url + '/' + id);
		}
	}
});

app.factory("SelectService", function($http) {
	return {
		get: function(url, id) {
			return $http.get(url + '/' + id).then(function(result) {
				return result;
			});
		},
		all: function(url){
			return $http.get(url).then(function(result) {
				return result;
			});
		}
	}
	
});



// var serviceBase = 'user/'
// var obj = {};
// obj.getCustomers = function() {
// 	return $http.get(serviceBase + 'customers');
// }
// obj.getCustomer = function(customerID) {
// 	return $http.get(serviceBase + 'id=' + customerID);
// }

// obj.insertCustomer = function(customer) {
// 	return $http.post(serviceBase + 'insertCustomer', customer).then(function(results) {
// 		return results;
// 	});
// };

// obj.updateCustomer = function(id, customer) {
// 	return $http.post(serviceBase + 'updateCustomer', {
// 		id: id,
// 		customer: customer
// 	}).then(function(status) {
// 		return status.data;
// 	});
// };

// obj.deleteCustomer = function(id) {
// 	return $http.delete(serviceBase + 'deleteCustomer?id=' + id).then(function(status) {
// 		return status.data;
// 	});
// };

// return obj;

// app.factory("SelectService", function($http, $scope) {
// 	return {
// 		one: function(url, id) {
// 			return $http.post(url / id);
// 		}
// 	}
// });

app.factory("UserService", function($http) {
	return {
		get: function() {
			return $http.get('user/list');
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
		get: function(id) {
			return $http.get('user/profile');
		}
	};
});

app.factory("FlashService", function($rootScope, toaster) {
	return {
		show: function(message, type, title) {
			$rootScope.flash = toaster.pop(type, title, message);
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
		FlashService.show(response.flash, 'error');
	};

	var anyError = function(response) {
		FlashService.show(response.flash, 'error');
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