const gulp = require('gulp');
const sass = require('gulp-sass');
const ejs = require('gulp-ejs');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const browser = require('browser-sync');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const cleanCss = require('gulp-clean-css');
const webpack = require('gulp-webpack');
const pkg = require('./package.json');

gulp.task('server', function () {
  browser({
    server: {
      baseDir: ''
    }
  });
});

gulp.task('sass', function () {
  gulp.src(['sass/*.scss'])
      .pipe(plumber())
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(gulp.dest('./css/'))
      .pipe(browser.reload({
        stream: true
      }))
});

gulp.task('minify-css', ['sass'], function () {
  gulp.src('css/*.css')
      .pipe(plumber())
      .pipe(cleanCss({ compatibility: 'ie8' }))
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest('./public/css'))
      .pipe(browser.reload({
        stream: true
      }))
});

gulp.task('minify-js', function () {
  gulp.src('js/*.js')
      .pipe(plumber())
      .pipe(uglify())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest('./public/js'))
      .pipe(browser.reload({
        stream: true
      }))
});

gulp.task('ejs', function() {
    gulp.src(['ejs/**/_*.ejs','ejs/*.ejs'])
        .pipe(plumber())
        .pipe(ejs())
        .pipe(rename({extname: '.html'}))
        .pipe(gulp.dest("./public"))
        .pipe(browser.reload({
          stream:true
        }))
});

gulp.task('build', ['minify-css', 'minify-js', 'ejs']);

gulp.task('default', ['server'], function () {
  gulp.watch('sass/**/*.scss', ['sass']);
  gulp.watch(['js/**/*.js', '!js/min/**/*.js'], ['js']);
  gulp.watch('ejs/**/*.ejs', ['ejs']);
});
