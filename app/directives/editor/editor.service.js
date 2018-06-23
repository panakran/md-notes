/**
 * deticated services for editor directive
 */
angular.module('editor.service', [])
        .factory('editor', editor);
/**
 * services close file and select tab
 * @return {editor.editor.serviceAnonym$0}
 */
function editor() {
    return {
        closeFile: closeFile,
        selectTab: selectTab
    };

    function closeFile(activeFile) {
        activeFile.active = false;
    }
    function selectTab(selectedTab, file) {
        selectedTab = file;
    }
}