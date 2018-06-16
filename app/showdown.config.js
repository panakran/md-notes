angular.module('main')
        .config(ShowdownConfig);

ShowdownConfig.$inject = ['$showdownProvider'];
function ShowdownConfig($showdownProvider) {
    let showdown = require("showdown");
    let hljs = require("highlight.js");
    let highlightExtension = require('showdown-highlight');
    showdown.setFlavor('github');
    showdown.extension('hljs', highlightExtension);
    hljs.initHighlightingOnLoad();
    $showdownProvider.setOption('excludeTrailingPunctuationFromURLs', true);
    $showdownProvider.setOption('smoothLivePreview', true);
    $showdownProvider.setOption('simpleLineBreaks', true);
    $showdownProvider.setOption('requireSpaceBeforeHeadingText', true);
    $showdownProvider.setOption('openLinksInNewWindow', true);
    $showdownProvider.loadExtension('hljs');
    let github = {//  the github object was taken from flavor.github in showdown.js
        omitExtraWLInCodeBlocks: true,
        prefixHeaderId: 'user-content-',
        simplifiedAutoLink: true,
        literalMidWordUnderscores: true,
        strikethrough: true,
        tables: true,
        tablesHeaderId: true,
        ghCodeBlocks: true,
        tasklists: true};
    Object.keys(github).forEach((key) => $showdownProvider.setOption(key, github[key]));
}