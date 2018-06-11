let template = require('raw-loader!./editor.template.html');

angular.module('EditorModule', [])
        .directive('editor', editor)
        .controller('editorController', editorController);


function editor() {
    return{
        template: template,
        controller: "editorController",
        controllerAs: "vmController",
        bindToController: true,
        restrict: 'E',
        scope: {addfile: '&', activefile: '<'},
        link: linkFunction()
    };
}

function linkFunction() {
    return{
        pre: preLink,
        post: postLink
    };
}

/**
 * prelinking function
 */
function preLink(scope, elem, attr, ctrl) {
}

/**
 * postlinking function
 */
function postLink(scope, elem, attr, ctrl) {
}

/**
 * Controller function
 */
editorController.$inject = [];
function editorController() {
    let vm = this;
    vm.selectTab = selectTab;
    vm.closeFile = closeFile;

    function closeFile(index) {
        vm.activefile.splice(index, 1);
    }
    function selectTab(file) {
        vm.selectedTab = file;
    }

    vm.toggle = false;
}