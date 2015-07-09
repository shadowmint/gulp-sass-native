var sass = require('../index');
var gulp = require('gulp');

gulp.task('default', function(callback) {
  return gulp.src('./src/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./build'));
});
