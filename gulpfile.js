var gulp = require("gulp");
var watch = require("gulp-watch");
var uglify = require("gulp-uglify");
var connect = require("gulp-connect");
var concat = require("gulp-concat");
var browserify = require("browserify");
var babelify = require("babelify");
var buffer = require("vinyl-buffer");
var source = require("vinyl-source-stream");

gulp.task("webserver", function() {
  connect.server({
    port: 80,
    livereload: true
  });
});

gulp.task("reload", function() {
  connect.reload()
});

gulp.task("compile", function () {
  var bundler = browserify("js/app.js");
  bundler.transform(babelify);

  bundler.bundle()
  .on("error", function (err) { console.error(err); })
  .pipe(source("app.bundle.js"))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest("dist"))
  .pipe(connect.reload());
});

gulp.task("watch", function() {
   watch(["index.html", "js/**/*.js"], ["compile"]).pipe(connect.reload());
});

gulp.task("default", ["compile", "watch", "webserver"]);
