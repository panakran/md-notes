/**
 * Editor module definition
 */

/**
 * load template 
 */
let template = require('raw-loader!./editor.template.html');

/**
 * directive and controller for this module
 */
angular.module('EditorModule', ['editor.service', 'ngSanitize'])
        .directive('editor', editor)
        .controller('editorController', editorController);

/**
 * Directive definition and options
 * @return {editor.editor.directiveAnonym$0}
 */
function editor() {
    return{
        template: template,
        controller: "editorController",
        controllerAs: "vmController",
        bindToController: true,
        restrict: 'E',
        scope: {addfile: '&', activefile: '<', togglefilepanel: '='},
        link: linkFunction()
    };
}

/**
 * linking function
 */
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
editorController.$inject = ['editor', '$window', '$location', '$sce'];
function editorController(editor, $window, $location, $sce) {
    let vm = this;
    
    /**
     * Public directive variables
     */
    vm.toggle = false;
    
    /**
     * Public directive methods
     */
    vm.selectTab = selectTab;
    vm.closeFile = closeFile;
    vm.createFile = createFile;
    vm.saveFile = saveFile;
    vm.shareFile = shareFile;

    /**
     * Close file method (removes file from tabs)
     * @param {type} index
     * @return {undefined}
     */
    function closeFile(index) {
        editor.closeFile(vm.activefile[index]);
    }
    
    /**
     * Save file NOT USED
     * @param {type} fileTosave
     * @return {undefined}
     */
    function saveFile(fileTosave) {
        vm.addfile({file: fileTosave});
    }
    
    /**
     * Select tab method when active tab changing
     * @param {type} file
     * @return {undefined}
     */
    function selectTab(file) {
        vm.selectedTab = file;
    }
    
    /**
     * Create a new empty file method
     * @return {undefined}
     */
    function createFile() {
        vm.activefile.push({title: "New file", message: "", editMode: true, active: true});
    }
    
    /**
     * Share file method FIXME
     * @return {undefined}
     */
    function shareFile() {
        $window.open($sce.trustAsHtml($location.$$absUrl.replace("library", "share").concat(getRandomPassword(10))), '_blank');
    }

    /**
     * Generate a random string for share document
     * @param {type} length
     * @return {String}
     */
    function getRandomPassword(length) {
        let chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
        let pass = "";
        for (let x = 0; x < length; x++) {
            let i = Math.floor(Math.random() * chars.length);
            pass += chars.charAt(i);
        }
        return pass;
    }


}