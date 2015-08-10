/**
 * Document   : gulpfile.js
 * Created on : 2015 8
 * Author     : Kevin Zhong
 * License    : MIT
 * github     : https://github.com/willworks 
 * Description: 基于gulp和npm和scss前端自动构建解决方案
 * Copyright (c) 2015 Kevin Zhong

 * 解决问题
 * 1. 用scss和原生js编写代码
 * 2. gulp自动构建，压缩scss,图片和检查压缩js，编译出目标文件

 * 切换淘宝镜像加速 [node version manager]
 * npm http://npm.taobao.org/
 * npm install -g nrm
 * nrm use taobao

 * 切换node版本nrm [npm registry manager]
 * npm install -g nrm
 * nrm ls //查看node所有版本
 * nrm usr {verision}

 * 使用淘宝RubyGems镜像安装sass  
 * 安装ruby，会自动安装gem
 * gem sources --remove https://rubygems.org/  
 * gem sources -a https://ruby.taobao.org/  
 * gem install sass 
 
 * 组件安装
 * npm install gulp-util gulp-imagemin gulp-ruby-sass gulp-minify-css gulp-jshint gulp-uglify gulp-rename gulp-concat del gulp-livereload tiny-lr --save-dev

 * 使用问题
 * 1.gulp-clean和gulp-rimraf使用del代替，注意npm https://www.npmjs.com 上包的更新
 * 2.注意接口更新，详细参照https://github.com/sindresorhus/gulp-ruby-sass
 */

// 引入 gulp及组件
var gulp    = require('gulp'),                 //基础库
    imagemin = require('gulp-imagemin'),       //图片压缩
    sass = require('gulp-ruby-sass'),          //sass
    minifycss = require('gulp-minify-css'),    //css压缩
    jshint = require('gulp-jshint'),           //js检查
    uglify  = require('gulp-uglify'),          //js压缩
    rename = require('gulp-rename'),           //重命名
    concat  = require('gulp-concat'),          //合并文件
    del = require('del'),                      //清空文件夹 gulp-clean和gulp-rimraf使用del代替 2015.8.6
    tinylr = require('tiny-lr'),               //livereload
    server = tinylr(),
    port = 35729,
    livereload = require('gulp-livereload');   //livereload


// HTML处理
gulp.task('html', function() {
    var htmlSrc = './src/*.html',
        htmlDst = './dist/';

    gulp.src(htmlSrc)
        .pipe(livereload(server))
        .pipe(gulp.dest(htmlDst))
});


// 样式处理
gulp.task('css', function () {
    var cssSrc = './src/scss/*.scss',
        cssDst = './dist/css';

    gulp.src(cssSrc)
        .pipe(sass({style: 'expanded'}))
        .pipe(gulp.dest(cssDst))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(livereload(server))
        .pipe(gulp.dest(cssDst));
});

===========================================================================
gulp.task('sass', function () {
    return sass('source', {sourcemap: true})
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('result'));
});


gulp.task('sass', function() {
    return sass('source', { sourcemap: true })
    .on('error', function (err) {
      console.error('Error', err.message);
   })

    .pipe(sourcemaps.write('maps', {
        includeContent: false,
        sourceRoot: '/source'
    }))

    .pipe(gulp.dest('result'));
});
===========================================================================

// 图片处理
gulp.task('images', function(){
    var imgSrc = './src/images/**/*',
        imgDst = './dist/images';
    gulp.src(imgSrc)
        .pipe(imagemin())
        .pipe(livereload(server))
        .pipe(gulp.dest(imgDst));
})


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


// 默认任务 清空图片、样式、js并重建 运行语句 gulp
gulp.task('default', ['clean'], function(){
    gulp.start('html','css','images','js');
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
        })

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