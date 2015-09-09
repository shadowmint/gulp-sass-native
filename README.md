# gulp-sass-native

Uses the command line sass compiler instead of libsass.

## Install

```
$ npm install --save-dev shadowmint/gulp-sass-native#0.0.1
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

### Streaming

If you have issues using gulp-plumber, you can manually handle errors
using:

```js
gulp.task('default', function () {
  return gulp.src('src/*.scss')
    .pipe(sass({
      stream: true,
      handler: function(err) { ... }))
    .pipe(gulp.dest('dist'));
});
```

By default (if only `stream` is set, the error is simply printed using console.log

## License

MIT
