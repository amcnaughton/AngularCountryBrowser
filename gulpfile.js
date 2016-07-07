// Include gulp
var gulp = require('gulp');
var connect = require('gulp-connect');
var usemin = require('gulp-usemin');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var clean = require('gulp-clean');


var paths = {
    scripts: ['app/**/*.js', '!app/bower_components/**/*.js'],
    html: [
        './app/**/*.html',
        '!./app/index.html',
        '!./app/bower_components/**/*.html'
    ],
    images: './app/images/**',
    index: './app/index.html',
    build: './build/'
}

gulp.task('clean', function () {
    gulp.src(paths.build, {read: false})
        .pipe(clean());
});

gulp.task('copy', ['clean'], function () {
    gulp.src(paths.html)
        .pipe(gulp.dest('build/'));

    gulp.src(paths.images)
        .pipe(gulp.dest('build/images'));
});

gulp.task('usemin', ['copy'], function () {
    gulp.src(paths.index)
        .pipe(usemin({
            css: [minifyCss(), 'concat'],
            js: [ngAnnotate(), uglify()]
        }))
        .pipe(gulp.dest(paths.build))
});

gulp.task('build', ['usemin']);

// connect
gulp.task('connect', function () {
    connect.server({
        root: 'app/'
    });
});
gulp.task('default', ['connect']);
