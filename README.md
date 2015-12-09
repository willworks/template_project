# template_project  
基于gulp和npm和scss前端自动构建解决方案  


## 解决问题  
 - 用scss和原生js编写代码  
 - gulp自动构建，编译scss,压缩css，图片和js，编译出目标文件  


## 目录说明  
 >-template_project  
 >>-README 存放说明文件附加图片  
 >>–.git 通过git管理项目会生成这个文件夹  
 >>–node_modules 组件目录  
 >>–dist 发布环境  
   >>>–css 样式文件(main.min.css)  
   >>>–img 图片文件(压缩图片)  
   >>>–js js文件(main.min.js)  
   >>>–*.html 静态文件

 >>–src 生产环境  
   >>>–scss scss文件  
   >>>–css css文件 
   >>>–img 图片文件  
   >>>–js js文件  
   >>>–*.html 静态文件  

 >>–gulpfile.js gulp任务文件  


## 使用方法  
  - npm install // 安装文件依赖  
  - gulp // 默认执行全部动作，清理dist文件夹，压缩文件，开启服务器监听
  - gulp js // 压缩js
  - gulp css // 压缩css
  - gulp img // 压缩img
  - gulp scss // 编译scss，这部分使用较少，独立出来使用
  - gulp server // 开启监听服务器实现liveReload

  - ![image](https://github.com/willworks/template_project/raw/master/README/build.png)  
  - gulp server 开启服务器，默认打开入口网页，并且自动监控代码修改并且编译  
  - ![image](https://github.com/willworks/template_project/raw/master/README/liveReload.png)
 

## 切换淘宝镜像加速  
 - npm http://npm.taobao.org/  
 - npm install -g nrm  
 - nrm use taobao  


## 切换node版本nrm  
 - npm install -g nrm  
 - nrm ls //查看node所有版本  
 - nrm use {verision}  


## 使用淘宝RubyGems镜像安装sass  
 - 安装ruby，会自动安装gem  
 - gem sources --remove https://rubygems.org/  
 - gem sources -a https://ruby.taobao.org/  
 - gem install sass      


## 常见问题  
 - 在项目根目录新建一个文件：.jshintrc(windows用户创建.jshintrc.文件，系统会自动改名.jshintrc)，在此文件里填写你的检查规则  
 - gulp-ruby-sass新的语法能识别路径下的所有文件，不用指定后缀名  
 - 旧版 var cssSrc = './src/scss/*.scss' 新版 var cssSrc = './src/scss/' 
 - gulp-clean和gulp-rimraf使用del代替，注意npm https://www.npmjs.com 上包的更新  
 - 注意接口更新，详细参照https://github.com/sindresorhus/gulp-ruby-sass  


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