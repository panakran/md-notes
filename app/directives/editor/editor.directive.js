let template = require('raw-loader!./editor.template.html');

angular.module('EditorModule', [])
        .directive('editor', editor)
        .controller('editorController', editorController);


function editor() {
    return{
        template: template,
        controller: "editorController",
        controllerAs: "vmController",
        bindToController: true,
        restrict: 'E',
        scope: {addfile:'&'},
        link: linkFunction()
    };
}

function linkFunction() {
    return{
        pre: preLink,
        post: postLink
    };
}

/**
 * prelinking function
 */
function preLink(scope, elem, attr, ctrl) {
}

/**
 * postlinking function
 */
function postLink(scope, elem, attr, ctrl) {
}

/**
 * Controller function
 */
editorController.$inject = [];
function editorController() {
    let vm = this;
    console.log("as", vm)

//vm.addFile= addFile;
//function addFile(file){
//    console.log("a", file)
//    vm.addfile(file);
//}


    vm.toggle = false;
    vm.file = {message:
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
`, title: 'example'};
}