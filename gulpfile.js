/**
 * Document   : gulpfile.js
 * Created on : 2015 8
 * Author     : Kevin Zhong
 * License    : MIT
 * github     : https://github.com/willworks 
 * Description: 基于gulp和npm和scss前端自动构建解决方案
 * Copyright (c) 2015 Kevin Zhong
 */


// 引入 gulp及组件
var gulp = require('gulp'),                       //基础库
    imagemin = require('gulp-imagemin'),          //图片压缩
    sass = require('gulp-ruby-sass'),             //sass编译
    minifycss = require('gulp-minify-css'),       //css压缩
    uglify  = require('gulp-uglify'),             //js压缩
    rename = require('gulp-rename'),              //重命名
    concat  = require('gulp-concat'),             //合并文件
    sourcemaps = require('gulp-sourcemaps'),      //生成sourcemaps文件，用于合并之后文件的错误调试
    del = require('del'),                         //清空文件夹 gulp-clean和gulp-rimraf使用del代替 2015.8.6
    browserSync = require('browser-sync');        //browser-sync服务器刷新


// HTML处理
gulp.task('html', function() {
    var htmlSrc = './src/*.html',
        htmlDst = './dist/';

    gulp.src(htmlSrc)
        .pipe(gulp.dest(htmlDst));
});


// css压缩
gulp.task('css',function(){
  var cssSrc = './src/css/*.css',
      cssDst = './dist/css';
  gulp.src(cssSrc)
      .pipe(sourcemaps.init())
      .pipe(concat('main.css'))
      .pipe(minifycss())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest(cssDst));
});


// 图片压缩
gulp.task('img', function(){
    var imgSrc = './src/img/*.+(jpeg|jpg|png)',// 防止windows下gulp无法打开缩略图缓存Thunbs.db而报错
        imgDst = './dist/img';
    gulp.src(imgSrc)
        .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3 取值范围：0-7（优化等级）
            progressive: true,    //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true,     //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true      //类型：Boolean 默认：false 多次优化svg直到完全优化
         }))
        .pipe(gulp.dest(imgDst));
});


// js压缩
gulp.task('js', function () {
    var jsSrc = './src/js/*.js',
        jsDst ='./dist/js';
    gulp.src(jsSrc)
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(jsDst));
});


// 清空dist文件
gulp.task('clean', function() {
    del(['./dist/*', './dist/css', './dist/js', './dist/img'], {read: false});
});


// scss编译
gulp.task('scss', function () {
    //gulp-ruby-sass新的语法能识别路径下的所有文件，不用指定后缀名
    //旧版 var cssSrc = './src/scss/*.scss'
    var cssSrc = './src/scss/',
        cssDst = './dist/scss';
        return sass(cssSrc,{style: 'expanded'})
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
        .pipe(gulp.dest(cssDst));
});


// 编译工程：清空图片、样式、js并重建 运行语句 gulp build
gulp.task('build', ['clean'], function(){
    gulp.start('html', 'css', 'js', 'img');
});


// 服务器 开启时候默认监控文件更改并且自动编译
gulp.task('server', ['build'], function() {
    browserSync({
        files: "**",
        server: {
            baseDir: "./"
        }
    });
    // 监听html
    gulp.watch('./src/*.html', ['html']);
    // 监听css
    gulp.watch('./src/css/*.css', ['css']);
    // 监听img
    gulp.watch('./src/img/**/*', ['img']);
    // 监听js
    gulp.watch('./src/js/*.js', ['js']);
});


// 默认任务(编译工程)
gulp.task('default', ['server']);