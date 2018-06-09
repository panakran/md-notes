import 'bootstrap/dist/css/bootstrap.min.css';
import 'angular-ui-bootstrap/dist/ui-bootstrap-csp.css';
var ang = require("angular");

ang.module('app', ['ngSanitize','ui.router'])
        .controller('Ctrl', function($scope){
            
            $scope.toggle=false;
            $scope.message= 
`
Heading
=======

## Sub-heading
 
Paragraphs are separated
by a blank line.

Two spaces at the end of a line  
produces a line break.

Text attributes _italic_, 
**bold**, \`monospace\`.

Horizontal rule:

---

Bullet list:

  * apples
  * oranges
  * pears

Numbered list:

  1. wash
  2. rinse
  3. repeat

A [link](http://example.com).

![Image](https://cdn.changelog.com/uploads/icons/topics/rAq/icon_small.png?v=63686535673)

> Markdown uses email-style > characters for blockquoting.

Inline <abbr title="Hypertext Markup Language">HTML</abbr> is supported.
`;})
        .provider('markdownConverter', function () {
    var opts = {};
    return {
      config: function (newOpts) {
        opts = newOpts;
      },
      $get: function () {
        return new Showdown.Converter(opts);
      }
    };
  })
  .directive('btfMarkdown', ['$sanitize', 'markdownConverter', function ($sanitize, markdownConverter) {
    return {
      restrict: 'AE',
      link: function (scope, element, attrs) {
        if (attrs.btfMarkdown) {
          scope.$watch(attrs.btfMarkdown, function (newVal) {
            var html = newVal ? $sanitize(markdownConverter.makeHtml(newVal)) : '';
            element.html(html);
          });
        } else {
          var html = $sanitize(markdownConverter.makeHtml(element.text()));
          element.html(html);
        }
      }
    };
  }]);
