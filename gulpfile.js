var gulp = require('gulp'),
	source = require('vinyl-source-stream'),
	browserify = require('browserify'),
	browserSync = require('browser-sync').create();


  gulp.task('browserify', function() {
  	return browserify('./src/index.js')
  		.bundle()
  		.pipe(source('index.js'))
  		.pipe(gulp.dest('./dist/js'));
  });


  gulp.task('browser-sync', function() {
      browserSync.init({
        server: {
          baseDir: "./"
        }
      });
      gulp.watch(["index.html", "dist/js/*.js"]).on("change", browserSync.reload);
  });


  gulp.task('watch-files', function() {
  	gulp.watch('./src/**/*', ['browserify']);
   });


gulp.task('default', ['browserify', 'browser-sync', 'watch-files']);
