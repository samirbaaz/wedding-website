'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// compile scss to css
gulp.task('sass', function () {
    return gulp.src('./sass/styles.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({basename: 'styles.min'}))
        .pipe(gulp.dest('./css'));
});

gulp.task('copy-css', function (){
    return gulp.src(['node_modules/animate.css/animate.min.css', 'node_modules/font-awesome/css/font-awesome.min.css'])
        .pipe(gulp.dest('./css'))
});

gulp.task('copy-js', function (){
    return gulp.src(['node_modules/waypoints/lib/jquery.waypoints.min.js'])
        .pipe(gulp.dest('./js'))
});

// watch changes in scss files and run sass task
gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});

// minify js
gulp.task('minify-js', function () {
    return gulp.src('./js/scripts.js')
        .pipe(uglify())
        .pipe(rename({basename: 'scripts.min'}))
        .pipe(gulp.dest('./js'));
});

// default task
gulp.task('default', gulp.parallel('sass', 'minify-js', 'copy-css', 'copy-js'));