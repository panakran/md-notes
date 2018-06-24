
/**
 * app module (bootstraps app through main module)
 */
angular.module('app', [
    'main'])
        .directive("app", app);
function app($templateCache) {
    return{
        template: $templateCache.get('app'),
        restrict: 'E'
    };
}