/**
 * Vendors
 */
require('jquery');
require('bootstrap');
require('angular');
require('angular-animate');
require('angular-sanitize');
require('angular-ui-router');
require('./node_modules/angular-ui-bootstrap/dist/ui-bootstrap');
require('./node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls');
require('./node_modules/ngstorage/ngStorage');
require('lodash');
require('showdown');
require('./node_modules/highlight.js/lib/highlight.js');
require('./node_modules/ng-showdown/dist/ng-showdown');
require('./node_modules/showdown-github/dist/showdown-github');
require('./node_modules/showdown-highlight/lib/index');
require(`html-encoder-decoder`);

/**
 * Vendors css
 */
require('./node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css');
require('./node_modules/bootstrap/dist/css/bootstrap.css');
require('./node_modules/highlight.js/styles/github.css');
/**
 * Custom
 */
require('./app/app');
require('./app/main');
require('./app/route');
require('./app/showdown.config');
require('./app/templateCache');
require('./app/directives/editor/editor.directive');
require('./app/directives/editor/editor.service');
require('./app/directives/common/common.directives');
require('./app/services/common.services');