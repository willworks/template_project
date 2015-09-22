/**
 * Document   : gulpfile.js
 * Created on : 2015 8
 * Author     : Kevin Zhong
 * License    : MIT
 * github     : https://github.com/willworks 
 * Description: 基于gulp和npm和scss前端自动构建解决方案
 * Copyright (c) 2015 Kevin Zhong

 * 解决问题
 * 用scss和原生js编写代码
 * gulp自动构建，压缩scss,图片和检查压缩js，编译出目标文件

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
 * npm install gulp-util gulp-imagemin gulp-ruby-sass gulp-minify-css gulp-jshint gulp-uglify gulp-rename gulp-concat del gulp-livereload tiny-lr gulp-webserver --save-dev

 * 使用问题
 * 在项目根目录新建一个文件：.jshintrc（windows用户应该在文件管理器里面创建.jshintrc.文件，然后它会自动改名为.jshintrc），在此文件里填写你的检查规则
 * gulp-clean和gulp-rimraf使用del代替，注意npm https://www.npmjs.com 上包的更新
 * 注意接口更新，详细参照https://github.com/sindresorhus/gulp-ruby-sass
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
    del = require('del'),                         //清空文件夹 gulp-clean和gulp-rimraf使用del代替 2015.8.6
    tinylr = require('tiny-lr'),                  //livereload
    server = tinylr(),
    port = 35729,
    livereload = require('gulp-livereload'),      //livereload用于浏览器自动刷新
    webserver = require('gulp-webserver'),        //用于在本地启动Http服务
    autoprefixer = require('gulp-autoprefixer');  //引入autoprefixer插件


// HTML处理
gulp.task('html', function() {
    var htmlSrc = './src/*.html',
        htmlDst = './dist/';

    gulp.src(htmlSrc)
        .pipe(livereload(server))
        .pipe(gulp.dest(htmlDst));
});


// 样式处理
/*
    With the syntax changes in gulp-ruby-sass starting from 1.0.0-alpha, you'll need to use gulp-ruby-sass() instead of gulp.src() to compile your Sass from a file or directory.
    If you try to use the original syntax with newer or latest versions, you may encounter the following error:
    TypeError: Arguments to path.join must be strings
    For example, the original syntax in 0.7.x and earlier using gulp.src(), now deprecated:

    var gulp = require('gulp');
    var sass = require('gulp-ruby-sass');

    // gulp-ruby-sass: 0.7.1
    gulp.task('sass', function() {
        return gulp.src('path/to/scss')
            .pipe(sass({ style: 'expanded' }))
            .pipe(gulp.dest('path/to/css'));
    });
    The new syntax introduced in 1.x using gulp-ruby-sass() as a gulp source adapter:

    // gulp-ruby-sass: 1.x
    gulp.task('sass', function() {
        return sass('path/to/scss', { style: 'expanded' })//this is another difference
            .pipe(gulp.dest('path/to/css'));
    });
    Notice the difference in the first line of the return statement.
*/
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


// 图片处理
gulp.task('images', function(){
    var imgSrc = './src/images/**/*',
        imgDst = './dist/images';
    gulp.src(imgSrc)
        .pipe(imagemin({
                    optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
                    progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
                    interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
                    multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
         }))
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
gulp.task('default', ['build']);