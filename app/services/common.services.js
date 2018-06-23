/**
 * Common services module 
 */
angular.module('common.services', [])
        .factory('lodash', lodash)
        .factory('fetchConst', fetchConst)
        .factory('messages', messages)
        .factory('localStorage', localStorage)
        .factory('fileManager', fileManager)
        .factory('readFile', readFile);

/**
 * readFile service includes read file
 */
readFile.$inject = ['$window', '$q'];
function readFile($window, $q) {
    return {
        readFile: readFile
    };

    function readFile(file) {
        let deferred = $q.defer(),
                reader = new $window.FileReader();
        reader.onload = (ev) => {
            let content = ev.target.result;
            deferred.resolve(content);
        };

        reader.readAsText(file);
        return deferred.promise;
    }


}

/**
 * localStorage service save and load to local service
 */
localStorage.$inject = ['$localStorage'];
function localStorage($localStorage) {
    return {
        saveToLocalStorage: saveToLocalStorage,
        loadFromLocalStorage: loadFromLocalStorage
    };

    function saveToLocalStorage(files) {
        $localStorage.files = angular.copy(files);
    }

    function loadFromLocalStorage() {
        return $localStorage.files;
    }

}

/**
 * fileManager service for exporting and importing file operations
 */
function fileManager() {
    return {
        exportFile: exportFile,
        importFile: importFile
    };

    function exportFile(file) {
        let data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(file));
        let downloader = document.createElement('a');
        downloader.setAttribute('href', 'data:' + data);
        downloader.setAttribute('download', 'file.json');
        downloader.click();
    }

    function importFile() {
    }

}

/**
 * messages service includes the add succes add error message and private execute delay for adding times to messages when shown
 */
messages.$inject = ['$timeout'];
function messages($timeout) {
    return {
        addSuccessMessage: addSuccessMessage,
        addErrorMessage: addErrorMessage
    };

    function addSuccessMessage(messageString, alerts) {
        let m = {msg: messageString, type: 'success', showMessage: true};
        alerts.push(m);
        executeCloseDelay(messageString, alerts);

    }
    function addErrorMessage(messageString, alerts) {
        let m = {msg: messageString, type: 'danger', showMessage: true};
        alerts.push(m);
        executeCloseDelay(messageString, alerts);
    }

    /**
     * Private executed in this service only
     * @param {type} messageString
     * @param {type} alerts
     * @return {undefined}
     */
    function executeCloseDelay(messageString, alerts) {
        $timeout(() => alerts
                    .filter(x => x.msg === messageString)
                    .forEach(x => x.showMessage = false), 2000);
    }

}

/**
 * Lodash service calling injecting lodash and calling lodash. instead of _.
 */
function lodash() {
    return _;
}

/**
 * fetch constants service
 */
function fetchConst() {
    return {
        //my functionss
//        initData: initData,

    };


}
