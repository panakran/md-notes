/**
 * Load template string through webpack
 */
const nav = require("html-loader!.././app/templates/nav.template.html");
const library = require("html-loader!.././app/templates/library.template.html");
const about = require("html-loader!.././app/templates/about.template.html");
const share = require("html-loader!.././app/templates/share.template.html");

/**
 * Set component nvbar nad load templates to template cache
 * @type {type}
 */
angular.module('main')
//        .component('navbar', {template: nav})
        .run(TemplateCacheConfig);

/**
 * Put templates to cache
 */
TemplateCacheConfig.$inject = ['$templateCache'];
function TemplateCacheConfig($templateCache) {
    $templateCache.put('nav', nav);
    $templateCache.put('library', library);
    $templateCache.put('about', about);
    $templateCache.put('share', share);
}
