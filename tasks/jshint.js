var rewire = require('rewire');
var proxyquire = require('proxyquire');

try {
  var react = require('react-tools');
} catch (e) {
  throw new Error('grunt-jsxhint: The module `react-tools` was not found. ' +
    'To fix this error run `npm install react-tools --save-dev`.', e);
}

var jshintcli = rewire('jshint/src/cli');

//Get the original lint function
var origLint = jshintcli.__get__('lint');


function endsWith(string, suffix) {
  return string.indexOf(suffix, string.length - suffix.length) !== -1;
}

function endsWithOneOf(string, suffixes) {
  for(var i = 0; i < suffixes.length; i++) {
    if(endsWith(string,suffixes[i])) {
      return true;
    }
  }

  return false;
}

var defaultSuffixes = ['.jsx','.react.js'];

//override the lint function to also transform the jsx code
jshintcli.__set__('lint', function myLint(code, results, config, data, file) {
  var hasSuffix = endsWithOneOf(file,defaultSuffixes);

  if (hasSuffix) {
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
module.exports = function(grunt) {

  var origJsHint = 'jshint-original';

  // Registers jshint task
  gruntContribJshint.apply(this,[grunt]);

  // Rename the task, so we can use it
  grunt.task.renameTask('jshint', origJsHint);

  // Set jshint-original targets
  grunt.config.data[origJsHint] = grunt.config.data.jshint;

  // Register our MultiTask
  grunt.task.registerMultiTask('jshint', 'Validate files with JSXHint.', function() {
    var options = this.options();

    if(options.extensions) {

      // to follow the same pattern as used by jshint-cli.js
      var exts = options.extensions.split(',');
      exts.map(function(e) {
        e = e.replace(/[ ]/g, "");
        if(e) {
          defaultSuffixes.push(e);
        }
      });
    }

    // And call the original JSHINT task
    grunt.task.run([origJsHint]);
  });
};
