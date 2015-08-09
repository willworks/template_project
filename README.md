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

## 组件安装  
 - npm install gulp-util gulp-imagemin gulp-ruby-sass gulp-minify-css gulp-jshint gulp-uglify gulp-rename gulp-concat del gulp-livereload tiny-lr --save-dev  

## 使用问题  
 - gulp-clean和gulp-rimraf使用del代替，注意npm https://www.npmjs.com 上包的更新  
 - 注意接口更新，详细参照https://github.com/sindresorhus/gulp-ruby-sass  

## 目录说明  
>-template_project  
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
