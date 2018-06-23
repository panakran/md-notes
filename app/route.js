/**
 * Router configuration
 */
angular.module('main')
        .config(function ($stateProvider, $urlRouterProvider) {

            /**
             * Default path
             */
            $urlRouterProvider.otherwise("library");

            /**
             * State definitions
             */
            let aboutState = {
                name: 'about',
                url: '/about',
                templateProvider: ($templateCache) => $templateCache.get('about')
            };
            let libraryState = {
                name: 'library',
                url: '/library',
                templateProvider: ($templateCache) => $templateCache.get('library')
            };
            let shareState = {
                name: 'share',
                url: '/share',
                templateProvider: ($templateCache) => $templateCache.get('share')
            };
            $stateProvider.state(aboutState);
            $stateProvider.state(libraryState);
            $stateProvider.state(shareState);
        });