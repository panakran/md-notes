import 'bootstrap/dist/css/bootstrap.min.css';
import 'angular-ui-bootstrap/dist/ui-bootstrap-csp.css';

angular.module('main', ['ngSanitize', 'ui.router', 'EditorModule', 'ui.bootstrap'])
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
        .run(function ($rootScope, $state) {
            $state.go('nav');
        });

function MainCtrl($scope, $timeout) {
    $scope.files = [];
    $scope.alerts = [];
    
    $scope.addAlert = function () {
        let m = {msg: 'Another alert!', type: 'danger', showMessage:true};
        $scope.alerts.push(m);
         $timeout( function(m){
             $scope.alerts.filter(x=>x.type==='danger').forEach(x=>x.showMessage=false);
        }, 3000 );
    };

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
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
        console.log("title", file.title)
        if ($scope.files.filter(x => x.title === file.title).length === 0) {
            $scope.files.push(file);
        } else {
            //logger here
            console.log("already exists")
        }
    }

}


