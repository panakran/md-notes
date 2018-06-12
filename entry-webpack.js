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

/**
 * Vendors css
 */
require('./node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css');
require('./node_modules/bootstrap/dist/css/bootstrap.css');
/**
 * Custom
 */
require('./app/main');
require('./app/route');
require('./app/directives/editor/editor.directive');
require('./app/directives/common/common.directives');
require('./app/services/common.services');