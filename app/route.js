angular.module('main')
        .config(function ($stateProvider) {
            var activeFilesState = {
                name: 'activefiles',
                url: '/activefiles',
                templateUrl: "./app/templates/activefiles.template.html"
            };
            var aboutState = {
                name: 'about',
                url: '/about',
                templateUrl: "./app/templates/about.template.html"
            };
            var libraryState = {
                name: 'library',
                url: '/library',
                templateUrl: "./app/templates/library.template.html"
            };

            $stateProvider.state(activeFilesState);
            $stateProvider.state(aboutState);
            $stateProvider.state(libraryState);
        });