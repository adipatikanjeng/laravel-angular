app.directive("showsMessageWhenHovered", function() {
	return {
		restrict: "A", // A = Attribute, C = CSS Class, E = HTML Element, M = HTML Comment
		link: function(scope, element, attributes) {
			var originalMessage = scope.message;
			element.bind("mouseenter", function() {
				scope.message = attributes.message;
				scope.$apply();
			});
			element.bind("mouseleave", function() {
				scope.message = originalMessage;
				scope.$apply();
			});
		}
	};
});

app.directive('showAuthComponent', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attributes) {

			if (scope.isVisible == "true") {
				element.removeClass('hidden');


			} else {
				element.addClass('hidden');

			}

		}
	};
});

// app.directive('showAuthComponent', function() {
//     return function(scope, element, attrs) {
//     	$scope.isVisible = 'false';	 
// 	 $scope.isVisible = SessionService.get('authenticated');
//     }
// });