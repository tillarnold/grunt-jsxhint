#grunt-jsxhint

[![NPM](https://nodei.co/npm/grunt-jsxhint.png?downloads=true&stars=true)](https://nodei.co/npm/grunt-jsxhint/)
[![Dependency Status](https://david-dm.org/tillarnold/grunt-jsxhint.svg)](https://david-dm.org/tillarnold/grunt-jsxhint)

> Like [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint) but compatible with [react's](https://github.com/facebook/react) jsx


This grunt plugin works exactly like [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint). In fact it's even using `grunt-contrib-jshint`. The only difference to `grunt-contrib-jshint` is that this plugin runs `require('react-tools').transform` on every file passed in. This will transform the jsx syntax to regular JavaScript. Non jsx-files will be unchanged. Line numbers are preserved by jsx so the line numbers outputted by jshint will be correct.

This is a drop in replacement for `grunt-contrib-jshint`. So you can just replace the `grunt-contrib-jshint` dependency in your `package.json` with `grunt-jsxhint`.

Use exactly like `grunt-contrib-jshint`:


```js
jshint: {
  //Everything like in grunt-contrib-jshint
}
```

Your jsx files need to have a `.jsx` file extension or start with
```js
/** @jsx React.DOM */
```

 
If `grunt-jsxhint` is lacking a feature or if you found bug (or a typo in the README) feel free to submit a pull request or file an issue.


## Release Historiy
* 2014-08-04   v0.2.0   Upgrade react-tools to 0.11.1. Add check for /** @jsx React.DOM */ comment in .jsx file.
* 2014-07-15   v0.1.0   Stop transforming non jsx files.
* 2014-07-12   v0.0.3   Use absolute version of grunt-contrib-jshint.
* 2014-06-20   v0.0.2   Added MIT licence. Updated README.
* 2014-06-19   v0.0.1   Initial version.
