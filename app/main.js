/**
 * Main module
 * import css
 */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'angular-ui-bootstrap/dist/ui-bootstrap-csp.css';
import 'highlight.js/styles/github.css';

/**
 * Includes modules
 */
angular.module('main', [
    'ngSanitize',
    'ui.router',
    'EditorModule',
    'ui.bootstrap',
    'ngStorage',
    'common.services',
    'common.directives',
    'ng-showdown'])
        .controller("MainCtrl", MainCtrl);

/**
 * Controller definition
 */
MainCtrl.$inject = ['messages', 'localStorage', 'fileManager', '$window', '$state', '$stateParams'];
function MainCtrl(messages, localStorage, fileManager, $window, $state, $stateParams) {
    let vm = this;
    
    /**
     * public variables
     */
    vm.activeFiles = [];
    vm.alerts = [];
    
    /**
     * public functions
     */
    vm.closeAlert = closeAlert;
    vm.saveToLocalStorage = saveToLocalStorage;
    vm.loadFromLocalStorage = loadFromLocalStorage;
    vm.exportFile = exportFile;
    vm.addFile = addFile;
    vm.updateFiles = updateFiles;
    vm.deleteFile = deleteFile;
    vm.addToActives = addToActives;

    /**
     * Load from local storage on start up
     */
    loadFromLocalStorage();
    if (vm.files == null) {
        vm.files = [
            {message:
                        `
# heading
`, title: 'example1', active: false, editMode: false}
        ];
    }

    /**
     * Close alert method
     * @param {type} index
     * @return {undefined}
     */
    function closeAlert(index) {
        vm.alerts.splice(index, 1);
    }

    /**
     * saveToLocalStorage method (saves state throught service)
     * @param {type} index
     * @return {undefined}
     */
    function saveToLocalStorage() {
        localStorage.saveToLocalStorage(vm.files);
    }
    
    /**
     * loadFromLocalStorage method (loads state throught service)
     * @param {type} index
     * @return {undefined}
     */
    function loadFromLocalStorage() {
        vm.files = localStorage.loadFromLocalStorage();
    }
    
    /**
     * exportFile method (exports a Json with the model throught service)
     * @param {type} index
     * @return {undefined}
     */
    function exportFile() {
        console.log(vm.files)
        fileManager.exportFile(vm.files);
    }
    
    /**
     * addFile method NOT USED
     * @param {type} file
     * @return {undefined}
     */
    function addFile(file) {
        console.log("-", vm.files);
        console.log("+", file);
        if (vm.files.filter(x => x.title === file.title).length > 0) {
            vm.files.filter(x => x.title === file.title)[0].title = angular.copy(file).title;
            vm.files.filter(x => x.title === file.title)[0].message = angular.copy(file).message;
            messages.addSuccessMessage(`${file.title} saved`, vm.alerts);
        } else {
            vm.files.push(file);
            messages.addSuccessMessage(`${file.title} created`, vm.alerts);
        }
        saveToLocalStorage();
    }
    /**
     * updateFiles method NOT USED
     * @param {type} file
     * @return {undefined}
     */
    function updateFiles(file) {
        vm.files = file;
    }
    
    /**
     * deleteFile method (removes file from model array on confirm and adds a message)
     * @param {type} file
     * @return {undefined}
     */
    function deleteFile(index) {
        let confirm = $window.confirm('Are you sure you want to delete this file?');
        if (confirm) {
            messages.addSuccessMessage(`File ${vm.files[index].title} deleted`, vm.alerts);
            vm.files.splice(index, 1);
        }
    }
    
    /**
     * addToActives method (activates file by moving to a tab and adds a message)
     * @param {type} file
     * @return {undefined}
     */
    function addToActives(file) {
        file.active = true;
        messages.addSuccessMessage(`File ${file.title} added to actives`, vm.alerts);
    }

}


