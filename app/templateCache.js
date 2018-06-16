const nav = require("html-loader!.././app/templates/nav.template.html");
const library = require("html-loader!.././app/templates/library.template.html");
const activefiles = require("html-loader!.././app/templates/activefiles.template.html");
const about = require("html-loader!.././app/templates/about.template.html");

angular.module('main')
        .component('navbar', {template: nav})
        .run(TemplateCacheConfig);

TemplateCacheConfig.$inject = ['$templateCache'];
function TemplateCacheConfig($templateCache) {
    $templateCache.put('nav', nav);
    $templateCache.put('library', library);
    $templateCache.put('activefiles', activefiles);
    $templateCache.put('about', about);
}
