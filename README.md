# gulp-custom

A simple example gulp plugin.

## Install

```
$ npm install --save-dev gulp-debug
```

## Usage

```js
var gulp = require('gulp');
var custom = require('gulp-custom');

gulp.task('default', function () {
	return gulp.src('src/*.js')
		.pipe(debug({'options': true}))
		.pipe(gulp.dest('dist'));
});
```
