grunt-jsxhint
=============

[![Dependency Status](https://david-dm.org/tillarnold/grunt-jsxhint.svg)](https://david-dm.org/tillarnold/grunt-jsxhint)

> Like [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint) but compatible with [react's](https://github.com/facebook/react) jsx


This grunt plugin works exactly like [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint). In fact it's even using grunt-contrib-jshint. The only difference to grunt-contrib-jshint is that this plugin runs `require('react-tools').transform` on every file passed in. This will transform the jsx syntax to regular JavaScript. Non jsx-files will be unchanged. Line numbers are preserved by jsx so the line number outputted by jshint will be correct.

Use exactly like [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint)


```js
jshint: {
  //Everything like in grunt-contrib-jshint
}
```

Your jsx files need to start with:

```js
/**
 * @jsx React.DOM
 */
 ```
 
If `grunt-jsxhint` is lacking a feature or if you found bug (or a typo in the README) feel free to submit a pull request or file an issue.
