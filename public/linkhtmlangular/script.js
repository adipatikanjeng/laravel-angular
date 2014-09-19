/*!
** ngRouter App
** Licensed under the Apache License v2.0
** http://www.apache.org/licenses/LICENSE-2.0
** Built by Jay Kanakiya ( @techiejayk )
**/

"use strict";

var App = angular.module("example",["ngRoute"]);

App.controller("ExmpCtrl",function  ($scope,$route) {
	$scope.message = "Takes it from Parent";
	$scope.debug = $route;
});

App.controller("ChildCtrl1",function  ($scope,$routeParams) {
	$scope.message = "Link 1 has been Visited";
	$scope.debug = $routeParams;
});

App.controller("ChildCtrl2",function  ($scope,$routeParams) {
	$scope.message = "Link 2 has been Visited";
	$scope.debug = $routeParams;
});

App.controller("ChildCtrl3",function  ($scope,$routeParams) {
	$scope.message = "Link 3 has been visited";
	$scope.debug = $routeParams;
});

App.config(function  ($routeProvider,$locationProvider) {
	$routeProvider
	.when("/link1",{
		templateUrl : "hello.html" , controller : "ChildCtrl1"
	})
	.when("/link2/:linkId",{
		templateUrl : "hello2.html" , controller : "ChildCtrl2"
	})
	.otherwise({
		templateUrl : "hello3.html"
	});
	$locationProvider.html5Mode(true);
});