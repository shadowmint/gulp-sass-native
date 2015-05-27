# gulp-custom

A simple example gulp plugin.

## Install

```
$ npm install --save-dev gulp-debug
```

## Usage

```js
var gulp = require('gulp');
var sass = require('gulp-sass-native');

gulp.task('default', function () {
	return gulp.src('src/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('dist'));
});
```

## License

MIT
