var rewire = require('rewire');
var proxyquire = require('proxyquire');
var react = require('react-tools')
 
var jshintcli = rewire('jshint/src/cli');
 
var origLint = jshintcli.__get__("lint");
 
jshintcli.__set__("lint", function myLint(code, results, config, data, file) {
  console.log("Linting file:",file);
  origLint(react.transform(code), results, config, data, file);
});
 
var libJsHint = proxyquire('grunt-contrib-jshint/tasks/lib/jshint',{
  'jshint/src/cli': jshintcli
});
 
var gruntContribJshint = proxyquire('grunt-contrib-jshint',{
  './lib/jshint': libJsHint
});
 
module.exports = gruntContribJshint;
