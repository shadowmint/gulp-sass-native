var sass = require('../index');
var gulp = require('gulp');

gulp.task('default', function(callback) {
  return gulp.src('./src/*.scss')
    .pipe(sass({ stream: true }))
    .pipe(gulp.dest('./build'));
});

gulp.task('watch', function(callback) {
  gulp.watch('./src/*.scss', ['default']);
});
