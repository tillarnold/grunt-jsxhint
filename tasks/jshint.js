var rewire = require('rewire');
var proxyquire = require('proxyquire');
try {
  var react = require('react-tools');
} catch (e) {
  throw new Error('grunt-jsxhint: The module `react-tools` was not found. ' +
    'To fix this error run `npm install react-tools --save-dev`.', e);
}

var jshintcli = rewire('jshint/src/cli');
var docblock = require('jstransform/src/docblock');

//Get the original lint function 
var origLint = jshintcli.__get__("lint");

var jsxSuffix = ".jsx";
var reactJsSuffix = '.react.js';

//override the lint function to also transform the jsx code
jshintcli.__set__("lint", function myLint(code, results, config, data, file) {
  var isJsxFile = file.indexOf(jsxSuffix, file.length - jsxSuffix.length) !== -1;
  var isReactJsFile = file.indexOf(reactJsSuffix, file.length - reactJsSuffix.length) !== -1;
  var hasSuffix = isJsxFile || isReactJsFile;

  //added check for having /** @jsx React.DOM */ comment
  var hasDocblock = docblock.parseAsObject(docblock.extract(code)).jsx;
  if (hasSuffix && !hasDocblock) {
    code = '/** @jsx React.DOM */' + code;
  }
  if (hasSuffix || hasDocblock) {
    var compiled;

    try {
      compiled = react.transform(code);
    } catch (err) {
      throw new Error('grunt-jsxhint: Error while running JSXTransformer on ' + file + '\n' + err.message);
    }

    origLint(compiled, results, config, data, file);
  } else {
    origLint(code, results, config, data, file);
  }
});

//override the jshint cli in the grunt-contrib-jshint lib folder 
var libJsHint = proxyquire('grunt-contrib-jshint/tasks/lib/jshint', {
  'jshint/src/cli': jshintcli
});


//insert the modified version of the jshint lib to the grunt-contrib-jshint taks
var gruntContribJshint = proxyquire('grunt-contrib-jshint/tasks/jshint', {
  './lib/jshint': libJsHint
});

//return the modified grunt-contrib-jshint version
module.exports = gruntContribJshint;
