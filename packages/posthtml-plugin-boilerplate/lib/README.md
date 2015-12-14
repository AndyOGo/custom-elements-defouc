# PLUGIN_TITLE

<a href="https://github.com/posthtml/posthtml"><img src="http://posthtml.github.io/posthtml/logo.svg" alt="PostHTML Logo" width="80" height="80" align="right"></a>

[![NPM Version][npm-img]][npm] [![Build Status][ci-img]][ci]

[PLUGIN_TITLE] PLUGIN_DESC.

```html
<!-- BEFORE -->

<!-- AFTER -->
```

## Usage

Add [PLUGIN_TITLE] to your build tool:

```bash
npm install PLUGIN_NAME --save-dev
```

#### Node

```js
require('PLUGIN_NAME').process(YOUR_HTML, { /* options */ });
```

#### PostHTML

Add [PostHTML] to your build tool:

```bash
npm install posthtml --save-dev
```

Load [PLUGIN_TITLE] as a PostHTML plugin:

```js
posthtml([
	require('PLUGIN_NAME')({ /* options */ })
]).process(YOUR_HTML, /* options */);
```

#### Gulp

Add [Gulp PostHTML] to your build tool:

```bash
npm install gulp-posthtml --save-dev
```

Enable [PLUGIN_TITLE] within your Gulpfile:

```js
var posthtml = require('gulp-posthtml');

gulp.task('html', function () {
	return gulp.src('./src/*.html').pipe(
		posthtml([
			require('PLUGIN_NAME')({ /* options */ })
		])
	).pipe(
		gulp.dest('.')
	);
});
```

#### Grunt

Add [Grunt PostHTML] to your build tool:

```bash
npm install grunt-posthtml --save-dev
```

Enable [PLUGIN_TITLE] within your Gruntfile:

```js
grunt.loadNpmTasks('grunt-posthtml');

grunt.initConfig({
	posthtml: {
		options: {
			use: [
				require('PLUGIN_NAME')({ /* options */ })
			]
		},
		dist: {
			src: '*.html'
		}
	}
});
```

[ci]:      https://travis-ci.org/GITHUB_NAME/PLUGIN_NAME
[ci-img]:  https://img.shields.io/travis/GITHUB_NAME/PLUGIN_NAME.svg
[npm]:     https://www.npmjs.com/package/PLUGIN_NAME
[npm-img]: https://img.shields.io/npm/v/PLUGIN_NAME.svg

[Gulp PostHTML]:  https://github.com/posthtml/gulp-posthtml
[Grunt PostHTML]: https://github.com/TCotton/grunt-posthtml
[PostHTML]:       https://github.com/posthtml/posthtml

[PLUGIN_TITLE]: https://github.com/GITHUB_NAME/PLUGIN_NAME
