'use strict';

var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    server = require('gulp-server-livereload'),
    eslint = require('gulp-eslint'),
    babel = require("gulp-babel");

gulp.task('default', ['watch', 'server']);

gulp.task('watch', () => {
  gulp.watch('src/**/*.js', ['lint']);
  gulp.watch('src/**/*.less', ['less']);
  gulp.watch('src/js/app.js', ['transpile']);
});

gulp.task('transpile', () => {
  return gulp.src('src/js/app.js')
  .pipe(babel())
  .pipe(gulp.dest('dist/js'));
});

gulp.task('less', () => {
  return gulp.src('src/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('dist'));
});

gulp.task('server', () => {
  gulp.src('')
    .pipe(server({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});

gulp.task('lint', function () {
    return gulp.src(['src/**/*.js','!node_modules/**'])
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError());
});
