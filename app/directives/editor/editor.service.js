angular.module('editor.service', [])
        .factory('editor', editor);

function editor() {
    return {
        closeFile: closeFile,
        selectTab: selectTab,
//        createFile: createFile
    };

    function closeFile(activeFile, index) {
        activeFile.splice(index, 1);
    }
    function selectTab(selectedTab, file) {
        selectedTab = file;
    }
    //FIXME: to be implemented
//    function createFile() {
//        vm.activefile.push({title: "New file", message: "", editMode: true});
//        vm.selectedTab = vm.activefile[vm.activefile.length + 1];
//    }
}