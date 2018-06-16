import 'bootstrap/dist/css/bootstrap.min.css';
import 'angular-ui-bootstrap/dist/ui-bootstrap-csp.css';
import 'highlight.js/styles/github.css';

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

MainCtrl.$inject = ['messages', 'localStorage', 'fileManager'];
function MainCtrl(messages, localStorage, fileManager) {
    let vm = this;
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

    loadFromLocalStorage();
    if (vm.files == null) {
        vm.files = [
            {message:
                        `
# h1 on the way
`, title: 'example1'}
        ];
    }

    function closeAlert(index) {
        vm.alerts.splice(index, 1);
    }

    function saveToLocalStorage() {
        localStorage.saveToLocalStorage(vm.files);
    }

    function loadFromLocalStorage() {
        vm.files = localStorage.loadFromLocalStorage();
    }

    function exportFile() {
        fileManager.exportFile(vm.files);
    }
    function addFile(file) {
        console.log(file)
        if (vm.files.filter(x => x.title === file.title).length === 0) {
            vm.files.push(file);
            messages.addSuccessMessage(`New file created`, vm.alerts);
        } else {
            messages.addErrorMessage(`Cannot create file ${file.title}, name already exists`, vm.alerts);
        }
    }
    function updateFiles(file) {
        vm.files = file;
    }
    function deleteFile(index) {
        vm.files.splice(index, 1);
    }
    function addToActives(file) {
        if (vm.activeFiles.filter(x => x.title === file.title).length === 0) {
            let newActiveFile = angular.copy(file);
            newActiveFile["editMode"] = false;
            vm.activeFiles.push(newActiveFile);
            messages.addSuccessMessage(`File ${file.title} added to actives`, vm.alerts);

        } else {
            messages.addErrorMessage(`File ${file.title} already to actives`, vm.alerts);
        }
    }

}


