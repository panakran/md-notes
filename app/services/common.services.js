angular.module('common.services', [])
        .factory('lodash', lodash)
        .factory('fetchConst', fetchConst)
        .factory('messages', messages)
        .factory('localStorage', localStorage)
        .factory('fileManager', fileManager)
        .factory('readFile', function ($window, $q) {
            'use strict';

            var readFile = function (file) {
                var deferred = $q.defer(),
                        reader = new $window.FileReader();

                reader.onload = function (ev) {
                    var content = ev.target.result;
                    deferred.resolve(content);
                };

                reader.readAsText(file);
                return deferred.promise;
            };

            return readFile;
        });


localStorage.$inject = ['$localStorage'];
function localStorage($localStorage) {
    return {
        saveToLocalStorage: saveToLocalStorage,
        loadFromLocalStorage: loadFromLocalStorage
    };

    function saveToLocalStorage(files) {
        $localStorage.files = files;
    }

    function loadFromLocalStorage() {
        return $localStorage.files;
    }

}
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

    function executeCloseDelay(messageString, alerts) {
        $timeout(function () {
            alerts.filter(x => x.msg === messageString).forEach(x => x.showMessage = false);
        }, 2000);
    }

}

function lodash() {
    return _;
}
function fetchConst() {
    return {
        //my functionss
//        initData: initData,

    };


}
