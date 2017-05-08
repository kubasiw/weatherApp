var gulp = require('gulp');
var sass = require('gulp-sass');

//var sftp = require('gulp-sftp');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');



// static server 
//Static Server + watching scss/ html file
gulp.task('serve', ['rwd'], function() {
   
    browserSync.init({
        server: "./"
    });
     
   gulp.watch("./sass/**/*.scss", ['rwd']);
    
   //Deploy na ftp
//   gulp.watch("./css/*", ['deployCss']);
//   gulp.watch("./*.php", ['deployMain']);
  
    gulp.watch("./*.css").on('change', browserSync.reload);
     gulp.watch("./*.html").on('change', browserSync.reload);
});




gulp.task('rwd', function() { // funkcja callback
    return gulp.src('./sass/**/*.scss') //-->zrodlo
        .pipe(sourcemaps.init())
        .pipe(sass({errLogToConsole:true}))
        .pipe(sourcemaps.write())        
        .pipe(gulp.dest('css')) // --> gdzie laduja
        .pipe(browserSync.stream())
})




gulp.task('default', ['serve']);
