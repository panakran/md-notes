/**
 * Common utilities directives 
 */
angular.module('common.directives', [])
        .directive('fileBrowser', function (readFile) {
            return {
                template: '<input type="file" style="display: none;" />' +
                        '<ng-transclude></ng-transclude>',
                transclude: true,
                scope: {updatefiles: '&'},
                link: function (scope, element) {
                    var fileInput = element.children('input[file]');
                    fileInput.on('change', function (event) {
                        var file = event.target.files[0];
                        readFile(file).then(function (content) {
                            console.log(content);
                            scope.updatefiles({file: content});
                        });
                    });

                    element.on('click', function () {
                        fileInput[0].click();
                    });
                }
            };
        })
        .directive("fileread", [function () {
                return {
                    scope: {
                        fileread: "="
                    },
                    link: function (scope, element, attributes) {
                        element.bind("change", function (changeEvent) {
                            var reader = new FileReader();
                            reader.onload = function (loadEvent) {
                                scope.$apply(function () {
                                    scope.fileread = loadEvent.target.result;
                                });
                            }
                            reader.readAsDataURL(changeEvent.target.files[0]);
                        });
                    }
                }
            }]);