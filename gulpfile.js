var gulp = require("gulp");
var watchify = require("watchify");
var uglify = require("gulp-uglify");
var connect = require("gulp-connect");
var browserify = require("browserify");
var babelify = require("babelify");
var buffer = require("vinyl-buffer");
var source = require("vinyl-source-stream");
var gutil = require('gulp-util');

var b = watchify(browserify("js/app.js"));
b.transform(babelify);

gulp.task('js', bundle);
b.on('update', bundle);
b.on('log', gutil.log);

function bundle() {
  return b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('app.bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest("dist"))
    .pipe(connect.reload());
}

gulp.task("webserver", function() {
  connect.server({
    port: 80,
    livereload: true
  });
});

gulp.task("default", ["webserver", "js"]);
