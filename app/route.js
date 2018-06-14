angular.module('main')
        .config(function ($stateProvider) {
            var activeFilesState = {
                name: 'activefiles',
                url: '/activefiles',
                templateProvider: function ($templateCache) {
                    return $templateCache.get('activefiles');
                }
            };
            var aboutState = {
                name: 'about',
                url: '/about',
                templateProvider: function ($templateCache) {
                    return $templateCache.get('about');
                }
            };
            var libraryState = {
                name: 'library',
                url: '/library',
                templateProvider: function ($templateCache) {
                    return $templateCache.get('library');
                }
            };

            $stateProvider.state(activeFilesState);
            $stateProvider.state(aboutState);
            $stateProvider.state(libraryState);
        });