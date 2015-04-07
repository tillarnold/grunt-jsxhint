#grunt-jsxhint [![Dependency Status](https://david-dm.org/tillarnold/grunt-jsxhint.svg)](https://david-dm.org/tillarnold/grunt-jsxhint)

 [![NPM](https://nodei.co/npm/grunt-jsxhint.png?downloads=true&stars=true)](https://nodei.co/npm/grunt-jsxhint/) 

> Like [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint) but compatible with [react's](https://github.com/facebook/react) jsx

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-jsxhint --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-jsxhint');
```

## Jshint task
This grunt plugin works exactly like [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint). In fact it's even using `grunt-contrib-jshint`. The only difference to `grunt-contrib-jshint` is that this plugin runs `require('react-tools').transform` on every file passed in. This will transform the jsx syntax to regular JavaScript. Non jsx-files will be unchanged. Line numbers are preserved by jsx so the line numbers outputted by jshint will be correct.

This is a drop in replacement for `grunt-contrib-jshint`. So you can just replace the `grunt-contrib-jshint` dependency in your `package.json` with `grunt-jsxhint`.

`grunt-jsxhint` needs `react-tools` to work. If you don't have `react-tools` installed run

```shell
npm install react-tools --save-dev
```


Use exactly like `grunt-contrib-jshint`:


```js
jshint: {
  //Everything like in grunt-contrib-jshint
}
```

## Parsed filed extensions
By default, your jsx files need to have a `.jsx` or `.react.js` file extension. In order to parse other files, add the following into your jshint options object:

```js
jshint: {
    options: {
        jshintrc: '.jshintrc',
        ignores: [],
        additionalSuffixes: ['.js']
    },
}
```

These suffixes are concatenated onto .jsx and .react.js.

## Contributing

If `grunt-jsxhint` is lacking a feature or if you found bug (or a typo in the README) feel free to submit a pull request or file an issue.


## Release History
* 2015-04-07   v0.6.0   Add `additionalSuffixes` option.
* 2015-02-06   v0.5.0   Update dependencies and remove /** @jsx React.DOM */
* 2014-10-29   v0.4.0   Add support for `.react.js` suffix
* 2014-08-14   v0.3.0   Improve error messages. Use locally installed react-tool. 
* 2014-08-04   v0.2.0   Add check for /** @jsx React.DOM */. Upgrade react-tools.
* 2014-07-15   v0.1.0   Stop transforming non jsx files.
* 2014-07-12   v0.0.3   Use absolute version of grunt-contrib-jshint.
* 2014-06-20   v0.0.2   Add MIT licence. Update README.
* 2014-06-19   v0.0.1   Initial version.
