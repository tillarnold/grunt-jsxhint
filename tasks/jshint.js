var rewire = require('rewire');
var proxyquire = require('proxyquire');

try {
  var babelCore = require('babel-core');
}
catch (e) {
  throw new Error('babel-core: The module `babel-core` was not found. ' +
      'To fix this error run `npm install babel-core --save-dev`.', e);
}

try {
  require('babel-plugin-transform-react-jsx');
}
catch (e) {
  throw new Error('babel transform-react-jsx: The module `babel-plugin-transform-react-jsx` was not found. ' +
    'To fix this error run `npm install babel-plugin-transform-react-jsx --save-dev`.', e);
}

var jshintcli = rewire('jshint/src/cli');

//Get the original lint function
var origLint = jshintcli.__get__('lint');


function endsWith(string, suffix) {
  return string.indexOf(suffix, string.length - suffix.length) !== -1;
}

function endsWithOneOf(string, suffixes) {
  for (var i = 0; i < suffixes.length; i++) {
    if (endsWith(string, suffixes[i])) {
      return true;
    }
  }

  return false;
}

//override the jshint cli in the grunt-contrib-jshint lib folder
var libJsHint = proxyquire('grunt-contrib-jshint/tasks/lib/jshint', {
  'jshint/src/cli': jshintcli
});


//insert the modified version of the jshint lib to the grunt-contrib-jshint taks
var gruntContribJshint = proxyquire('grunt-contrib-jshint/tasks/jshint', {
  './lib/jshint': libJsHint
});

//return the modified grunt-contrib-jshint version
module.exports = function(grunt) {
  var additionalSuffixes = grunt.config(['jshint', 'options', 'additionalSuffixes']) || [];

  var defaultSuffixes = ['.jsx', '.react.js'].concat(additionalSuffixes);

  //override the lint function to also transform the jsx code
  jshintcli.__set__('lint', function myLint(code, results, config, data, file) {
    //Remove the "additionalSuffixes" property to prevent
    //the "Bad option: 'additionalSuffixes'" error
    delete config.additionalSuffixes;
    var hasSuffix = endsWithOneOf(file, defaultSuffixes);

    if (hasSuffix) {
      var compiled;

      try {
        compiled = babelCore.transform(code, {
          plugins: ['transform-react-jsx']
        });
      }
      catch (err) {
        throw new Error('grunt-jsxhint: Error while running JSXTransformer on ' + file + '\n' + err.message);
      }

      origLint(compiled.code, results, config, data, file);
    } else {
      origLint(code, results, config, data, file);
    }
  });

  return gruntContribJshint(grunt);
};
