/* File: gulpfile.js */

// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    server = require('gulp-server-livereload');

gulp.task('default', ['watch', 'server']);

gulp.task('jshint', function() {
  return gulp.src('src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['jshint'])
  gulp.watch('src/**/*.less', ['less']);
});

gulp.task('less', function() {
  return gulp.src('src/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('dist'));
});

gulp.task('build-js', function() {
  return gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    //only uglify if gulp is ran with '--type production'
    .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop()) 
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('server', function() {
  gulp.src('')
    .pipe(server({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});