let template = require('raw-loader!./editor.template.html');

angular.module('EditorModule', ['editor.service'])
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
editorController.$inject = ['editor'];
function editorController(editor) {
    let vm = this;
    vm.selectTab = selectTab;
    vm.closeFile = closeFile;
    vm.createFile = createFile;
    vm.saveFile = saveFile;
    vm.toggle = false;

    function closeFile(index) {
        editor.closeFile(vm.activefile[index]);
    }
    function saveFile(fileTosave) {
        vm.addfile({file: fileTosave});
    }
    function selectTab(file) {
        vm.selectedTab = file;
    }
    function createFile() {
        vm.activefile.push({title: "New file", message: "", editMode: true, active:true});
//        vm.selectedTab = vm.activefile[vm.activefile.length + 1];
    }

}