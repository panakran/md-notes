angular.module('editor.service', [])
        .factory('editor', editor);

function editor() {
    return {
        closeFile: closeFile,
        selectTab: selectTab
//        createFile: createFile
    };

    function closeFile(activeFile) {
        activeFile.active = false;
    }
    function selectTab(selectedTab, file) {
        selectedTab = file;
    }
}