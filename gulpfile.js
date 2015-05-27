'use strict';
var gulp = require('gulp');
var custom = require('./');

gulp.task('default', function () {
	return gulp.src('*').pipe(debug());
});
