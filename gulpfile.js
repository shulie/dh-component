'use strict';
const gulp        = require('gulp');
const babel       = require('gulp-babel');
const sass        = require('gulp-sass');
const sourcemaps  = require('gulp-sourcemaps');
const concat      = require('gulp-concat');
/**
 * 批量导入样式 */
const antds = ['grid', 'menu'];

// 编译js文件
gulp.task('bable', function(){
  return gulp.src('./src/**/*.jsx')
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
});
// 批量合并 antd 的 css文件
gulp.task('import', function() {
  const _src = antds.map(function(item) {
    return './node_modules/antd/lib/' + item + '/style/index.css'
  });
  return gulp.src(_src)
  .pipe(concat("antd.css"))
  .pipe(gulp.dest('dist'));
})

gulp.task('concat', ['sass', 'import'], function() {
  return gulp.src(['./dist/index.css', './dist/antd.css'])
  .pipe(concat("index.css"))
  .pipe(gulp.dest('dist'));
})

gulp.task('sass', function() {
  return gulp.src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist'));
});

gulp.task('start', ['bable', 'sass', 'import', 'concat']);