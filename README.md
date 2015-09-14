# template_project  
基于gulp和npm和scss前端自动构建解决方案  

## 解决问题  
 - 用scss和原生js编写代码  
 - gulp自动构建，压缩scss,图片和检查压缩js，编译出目标文件  

## 切换淘宝镜像加速  
 - npm http://npm.taobao.org/  
 - npm install -g nrm  
 - nrm use taobao  

## 切换node版本nrm  
 - npm install -g nrm  
 - nrm ls //查看node所有版本  
 - nrm usr {verision}  

## 使用淘宝RubyGems镜像安装sass  
 - 安装ruby，会自动安装gem  
 - gem sources --remove https://rubygems.org/  
 - gem sources -a https://ruby.taobao.org/  
 - gem install sass  

## 组件安装  
 - npm install gulp-util gulp-imagemin gulp-ruby-sass gulp-minify-css gulp-jshint gulp-uglify gulp-rename gulp-concat del gulp-livereload tiny-lr --save-dev  

## 使用方法  
 - 进入根目录，npm install,安装文件依赖  
 - gulp 默认任务编译工程  
 - ![image](https://github.com/willworks/template_project/raw/master/README/build.png)  
 - gulp server 开启服务器，默认打开入口网页，并且自动监控代码修改并且编译  
 - ![image](https://github.com/willworks/template_project/raw/master/README/liveReload.png)    

## 常见问题  
 - 在项目根目录新建一个文件：.jshintrc(windows用户创建.jshintrc.文件，系统会自动改名.jshintrc)，在此文件里填写你的检查规则  
 - gulp-ruby-sass新的语法能识别路径下的所有文件，不用指定后缀名  
 - 旧版 var cssSrc = './src/scss/*.scss' 新版 var cssSrc = './src/scss/' 
 - gulp-clean和gulp-rimraf使用del代替，注意npm https://www.npmjs.com 上包的更新  
 - 注意接口更新，详细参照https://github.com/sindresorhus/gulp-ruby-sass  

## 目录说明  
>-template_project  
>>-README 存放说明文件附加图片  
>>–.git 通过git管理项目会生成这个文件夹  
>>–node_modules 组件目录  
>>–dist 发布环境  
  >>>–css 样式文件(style.css style.min.css)  
  >>>–images 图片文件(压缩图片)  
  >>>–js js文件(main.js main.min.js)  
  >>>–index.html 静态文件(压缩html)  

>>–src 生产环境  
  >>>–sass sass文件  
  >>>–images 图片文件  
  >>>–js js文件  
  >>>–index.html 静态文件  

>>–.jshintrc jshint配置文件  
>>–gulpfile.js gulp任务文件  

### 插件语法更新  
With the syntax changes in gulp-ruby-sass starting from 1.0.0-alpha, you'll need to use gulp-ruby-sass() instead of gulp.src() to compile your Sass from a file or directory.  
If you try to use the original syntax with newer or latest versions, you may encounter the following error:  
TypeError: Arguments to path.join must be strings  
For example, the original syntax in 0.7.x and earlier using gulp.src(), now deprecated:  

gulp-ruby-sass: 0.7.1  	
![image](https://github.com/willworks/template_project/raw/master/README/old.png)  
The new syntax introduced in 1.x using gulp-ruby-sass() as a gulp source adapter:  

gulp-ruby-sass: 1.x  
![image](https://github.com/willworks/template_project/raw/master/README/new.png)  