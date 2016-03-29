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

gulp.task('js', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

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

/*gulp.task("compile", function () {
  var bundler = browserify("js/app.js");
  bundler.transform(babelify);

  return bundler.bundle()
  .on("error", function (err) { console.error(err); })
  .pipe(source("app.bundle.js"))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest("dist"))
  .pipe(connect.reload());

  console.log('done');
});*/a

gulp.task("default", ["webserver", "js"]);
