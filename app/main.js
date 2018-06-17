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

MainCtrl.$inject = ['messages', 'localStorage', 'fileManager', '$window'];
function MainCtrl(messages, localStorage, fileManager, $window) {
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
# heading
`, title: 'example1', active: false, editMode: false}
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
        console.log("-", vm.files);
        console.log("+", file);
        if (vm.files.filter(x => x.title === file.title).length > 0) {
            vm.files.filter(x => x.title === file.title)[0].title = angular.copy(file).title;
            vm.files.filter(x => x.title === file.title)[0].message = angular.copy(file).message;
            messages.addSuccessMessage(`${file.title} saved`, vm.alerts);
        } else {
            vm.files.push(file);
            messages.addSuccessMessage(`${file.title} created`, vm.alerts);
//            messages.addErrorMessage(`Cannot save file ${file.title}`, vm.alerts);
        }
    }
    function updateFiles(file) {
        vm.files = file;
    }
    function deleteFile(index) {
        let confirm = $window.confirm('Are you sure you want to delete this file?');
        if (confirm) {
            messages.addSuccessMessage(`File ${vm.files[index].title} deleted`, vm.alerts);
            vm.files.splice(index, 1);
        }
    }
    function addToActives(file) {
        file.active = true;
        messages.addSuccessMessage(`File ${file.title} added to actives`, vm.alerts);
    }

}


