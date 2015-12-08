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
    jshint = require('gulp-jshint'),              //js检查
    uglify  = require('gulp-uglify'),             //js压缩
    rename = require('gulp-rename'),              //重命名
    concat  = require('gulp-concat'),             //合并文件
    autoprefixer = require('gulp-autoprefixer'),  //引入autoprefixer插件
    del = require('del'),                         //清空文件夹 gulp-clean和gulp-rimraf使用del代替 2015.8.6
    // 处理livereload
    tinylr = require('tiny-lr'),                  
    server = tinylr(),
    port = 35729,
    livereload = require('gulp-livereload'),      //livereload用于浏览器自动刷新
    webserver = require('gulp-webserver');        //用于在本地启动Http服务
   

// HTML处理
gulp.task('html', function() {
    var htmlSrc = './src/*.html',
        htmlDst = './dist/';

    gulp.src(htmlSrc)
        .pipe(livereload(server))
        .pipe(gulp.dest(htmlDst));
});


gulp.task('css', function () {
    //gulp-ruby-sass新的语法能识别路径下的所有文件，不用指定后缀名
    //旧版 var cssSrc = './src/scss/*.scss'
    var cssSrc = './src/scss/',
        cssDst = './dist/css';
        return sass(cssSrc,{style: 'expanded'})
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
        //添加autoprefixer参数，基于在线统计自动匹配，详细参考 http://caniuse.com/
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(cssDst))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(livereload(server))
        .pipe(gulp.dest(cssDst));
});


// 图片压缩
gulp.task('images', function(){
    var imgSrc = './src/images/*.+(jpeg|jpg|png)',// 防止windows下gulp无法打开缩略图缓存Thunbs.db而报错
        imgDst = './dist/images';
    
    gulp.src(imgSrc)
        .pipe(imagemin())
        .pipe(livereload(server))
        .pipe(gulp.dest(imgDst));
});


// js处理
gulp.task('js', function () {
    var jsSrc = './src/js/*.js',
        jsDst ='./dist/js';
    gulp.src(jsSrc)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default')) //jshint检查脚本
        .pipe(concat('main.js'))
        .pipe(gulp.dest(jsDst))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(livereload(server))
        .pipe(gulp.dest(jsDst));
});


// 清空图片、样式、js
gulp.task('clean', function() {
    del(['./dist/css', './dist/js', './dist/images'], {read: false});
});


// 编译工程：清空图片、样式、js并重建 运行语句 gulp build
gulp.task('build', ['clean'], function(){
    gulp.start('html','css', 'js');
});


// 监听任务 运行语句 gulp watch
gulp.task('watch',function(){
    server.listen(port, function(err){
        if (err) {
            return console.log(err);
        }
        // 监听html
        gulp.watch('./src/*.html', function(event){
            gulp.run('html');
        });
        // 监听css
        gulp.watch('./src/scss/*.scss', function(){
            gulp.run('css');
        });
        // 监听images
        gulp.watch('./src/images/**/*', function(){
            gulp.run('images');
        });
        // 监听js
        gulp.watch('./src/js/*.js', function(){
            gulp.run('js');
        });
    });
});


// 服务器 开启时候默认监控文件更改并且自动编译 gulp server
gulp.task('server', function() {
  gulp.src('./src/')
    .pipe(webserver({
      livereload: true,
      port: 8080, //端口号
      open: true  //自动打开浏览器
    }));
  gulp.start('watch');
});


// 默认任务(编译工程)
gulp.task('default', ['build', 'server']);