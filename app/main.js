import 'bootstrap/dist/css/bootstrap.min.css';
import 'angular-ui-bootstrap/dist/ui-bootstrap-csp.css';

angular.module('main', [
    'ngSanitize',
    'ui.router',
    'EditorModule',
    'ui.bootstrap',
    'ngStorage',
    'common.services'])
        .controller("MainCtrl", MainCtrl)
        .provider('markdownConverter', function () {
            var opts = {};
            return {
                config: function (newOpts) {
                    opts = newOpts;
                },
                $get: function () {
                    return new Showdown.Converter(opts);
                }
            };
        })
        .directive('btfMarkdown', ['$sanitize', 'markdownConverter', function ($sanitize, markdownConverter) {
                return {
                    restrict: 'AE',
                    link: function (scope, element, attrs) {
                        if (attrs.btfMarkdown) {
                            scope.$watch(attrs.btfMarkdown, function (newVal) {
                                var html = newVal ? $sanitize(markdownConverter.makeHtml(newVal)) : '';
                                element.html(html);
                            });
                        } else {
                            var html = $sanitize(markdownConverter.makeHtml(element.text()));
                            element.html(html);
                        }
                    }
                };
            }])
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
        .run(function ($rootScope, $state) {
            $state.go('nav');
        });

MainCtrl.$inject = ['$scope', 'messages', 'localStorage', 'fileManager'];
function MainCtrl($scope, messages, localStorage, fileManager) {
    $scope.activeFiles = [];
    $scope.files = [
        {message:
                    `
# h1 on the way
`, title: 'example1'},
        {message:
                    `
## h2 on the way
`, title: 'example2'},
        {message:
                    `
### h3 on the way
`, title: 'example3'}
    ];
    $scope.alerts = [];

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.saveToLocalStorage = function () {
        localStorage.saveToLocalStorage($scope.files);
    };
    $scope.loadFromLocalStorage = function () {
        $scope.files = localStorage.loadFromLocalStorage();
    };
    $scope.exportFile = function () {
        fileManager.exportFile($scope.files);
    };

    var _selected;

    $scope.selected = undefined;
    $scope.ngModelOptionsSelected = function (value) {
        if (arguments.length) {
            _selected = value;
        } else {
            return _selected;
        }
    };

    $scope.modelOptions = {
        debounce: {
            default: 500,
            blur: 250
        },
        getterSetter: true
    };

    $scope.selected = undefined;
    $scope.addFile = function (file) {
        if ($scope.files.filter(x => x.title === file.title).length === 0) {
            $scope.files.push(file);
            messages.addSuccessMessage('File created', $scope.alerts);
        } else {
            messages.addErrorMessage('Error!', $scope.alerts);
        }
    };
    $scope.updateFiles = function (file) {
        $scope.files = file;
    };
    $scope.deleteFile = function (index) {
        $scope.files.splice(index, 1);
    };
    $scope.addToActives = function (file) {
        if ($scope.activeFiles.filter(x => x.title === file.title).length === 0) {
            file["editMode"] = false;
            $scope.activeFiles.push(file);
            messages.addSuccessMessage('File created', $scope.alerts);
        } else {
            messages.addErrorMessage('Error!', $scope.alerts);
        }
    };

}


