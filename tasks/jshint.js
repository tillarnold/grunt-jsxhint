var rewire = require('rewire');
var proxyquire = require('proxyquire');
var react = require('react-tools')
 
var jshintcli = rewire('jshint/src/cli');

//Get the original lint function 
var origLint = jshintcli.__get__("lint");
 
//override the lint function to also transform the jsx code
jshintcli.__set__("lint", function myLint(code, results, config, data, file) {
  origLint(react.transform(code), results, config, data, file);
});

//override the jshint cli in the grunt-contrib-jshint lib folder 
var libJsHint = proxyquire('grunt-contrib-jshint/tasks/lib/jshint',{
  'jshint/src/cli': jshintcli
});


//insert the modified version of the jshint lib to the grunt-contrib-jshint taks
var gruntContribJshint = proxyquire('grunt-contrib-jshint/tasks/jshint',{
  './lib/jshint': libJsHint
});

//return the modified grunt-contrib-jshint version
module.exports = gruntContribJshint;
