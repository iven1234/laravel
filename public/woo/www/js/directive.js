angular.module('directiveModule', [])

.directive('timeline',function(){
	return {
		restrict: 'EA',
		templateUrl: 'templates/line.html',
		replace: true,
		scope: {
			line: '='
		},
		link: function(scope, iElement, iAttrs){

		}
	}
})
.directive('imageloaded', function () {
    return {
        restrict: 'A',

        link: function(scope, element, attrs) {   
            var cssClass = attrs.loadedclass;

            element.bind('load', function (e) {
                angular.element(element).addClass(cssClass);
            });
        }
    }
})
;