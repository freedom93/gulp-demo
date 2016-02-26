前言
/***********************************************/

把每一次学习的记录都当做在写一本很了不起的书，可能会写得很烂，但是坚持，总是会有收获的。一开始难免不了事倍功半，但是随着时间的积累和沉淀，总有一天会变得事半功倍。


简介
/***********************************************/

gulp是前端开发工作过程中对代码进行自动化构建项目的工具，不仅能对网站资源进行优化，还可以在开发过程中用适当的插件自动完成很多重复的任务，让开发者可以很愉快地写代码的同时还大大提高工作效率。
同类工具：grunt，fis，fis3

gulp是基于Nodejs的自动任务运行器， 能自动化地完成 javascript/coffee/sass/less/html/image/css 等文件的的测试、检查、合并、压缩、格式化、浏览器自动刷新、部署文件生成，并监听文件在改动后重复指定的这些步骤。在实现上，gulp借鉴了Unix操作系统的管道（pipe）思想，前一级的输出，直接变成后一级的输入，使得在操作上非常简单。通过本文，我们将学习如何使用Gulp来改变开发流程，从而使开发更加快速高效。

gulp 和 grunt 非常类似，但相比于 grunt 的频繁 IO 操作，gulp 的流操作，能更快地更便捷地完成构建工作。

gulp常用地址：

gulp官方网址：http://gulpjs.com

gulp插件地址：http://gulpjs.com/plugins

gulp 官方API：https://github.com/gulpjs/gulp/blob/master/docs/API.md

gulp 中文API：http://www.ydcss.com/archives/424


优势
/***********************************************/

1.易于使用
通过代码优于配置的策略，Gulp让简单的任务简单，复杂的任务可管理。
2.快速构建
利用Node.js流的威力，可以快速构建项目并减少频繁的IO操作。
3.插件高质量
Gulp严格的插件指南确保插件如你希望的那样简洁高质量工作。
4.易于学习
通过最少的API，掌握Gulp毫不费力，构建工作尽在掌握，如同一系列流管道。


快速入门
/***********************************************/

使用步骤（Windows）

安装nodejs -> 全局安装gulp ->新建package.json文件 -> 项目安装gulp以及gulp插件 -> 配置gulpfile.js -> 运行任务

1、安装nodejs

1.1、说明：gulp是基于nodejs；

1.2、安装：打开nodejs官网(https://nodejs.org/en/)，Download，它会根据系统信息选择对应版本（.msi文件）。然后像安装YY一样安装它就可以了（安装路径随意）。

1.3、检查nodejs是否安装成功，查看安装的nodejs的版本号，输入命令 node -v
PS：未能出现版本号，请尝试注销电脑重试；

1.4、npm是在安装nodejs时一同安装的nodejs包管理器，用于node插件管理（包括安装、卸载、管理依赖等）；所以也可输入 npm -v
查坎该版本nodejs的npm的版本号。

1.5、使用npm安装插件：命令提示符执行npm install <name> [-g] [--save-dev]；

1.5.1、<name>：node插件名称。例：npm install gulp --save-dev

1.5.2、-g：全局安装。将会安装在C:\Users\Administrator\AppData\Roaming\npm，并且写入系统环境变量； 
非全局安装：将会安装在当前定位目录；  
全局安装可以通过命令行在任何地方调用它，本地安装将安装在定位目录的node_modules文件夹下，通过require()调用；

1.5.3、--save：将保存配置信息至package.json（package.json是nodejs项目配置文件）；

1.5.4、-dev：保存至package.json的devDependencies节点，不指定-dev将保存至dependencies节点；

1.5.5、为什么要保存至package.json？因为node插件包相对来说非常庞大，所以不加入版本管理，将配置信息写入package.json并将其加入版本管理，其他开发者对应下载即可（命令提示符执行npm install，则会根据package.json下载所有需要的包）。

1.6、使用npm卸载插件：npm uninstall <name> [-g] [--save-dev]  PS：不要直接删除本地插件包

1.7、使用npm更新插件：npm update <name> [-g] [--save-dev]

1.8、查看npm帮助：npm help

1.9、当前目录已安装插件：npm list

PS：npm安装插件过程：从http://registry.npmjs.org下载对应的插件包（该网站服务器位于国外，所以经常下载缓慢或出现异常），解决办法如下：

命令提示符执行 npm install cnpm -g --registry=https://registry.npm.taobao.org；  
注意：安装完后最好查看其版本号cnpm -v或关闭命令提示符重写打开，安装完直接使用有可能会出现错误；

注：cnpm跟npm用法完全一致，只是在执行命令时将npm改为cnpm（以下操作将以cnpm代替npm）。


2、全局安装gulp 

2.1、说明：全局安装gulp目的是为了通过它执行gulp任务；

2.2、安装：命令提示符执行cnpm install gulp -g；

2.3、查看是否正确安装：命令提示符执行gulp -v，出现版本号即为正确安装。


3、新建package.json文件

3.1、说明：package.json是基于nodejs项目必不可少的配置文件，它是存放在项目根目录的普通json文件；
（注意：json文件内是不能写注释的，复制下列内容请删除注释）：

3.2、创建命令：cnpm init
{
  "name": "gulp-demo",  //项目名称（必须）
  "version": "0.0.1", //项目版本（必须）
  "description": "gulp demo", //项目描述（必须）
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {  //项目资源库
    "type": "git",
    "url": "git+https://github.com/freedom93/gulp-demo.git"
  },
  "keywords": [
    "gulp"
  ],
  "author": "freedom",
  "license": "MIT",  //项目许可协议
  "bugs": {
    "url": "https://github.com/freedom93/gulp-demo/issues"
  },
  "homepage": "https://github.com/freedom93/gulp-demo#readme",  //项目主页
  "devDependencies": {    //项目依赖的插件
    "gulp": "^3.9.1"
  }
}

3.3、查看package.json帮助文档，命令提示符执行cnpm help package.json

详细说明http://www.mujiang.info/translation/npmjs/files/package.json.html
特别注意：package.json是一个普通json文件，所以不能添加任何注释


4、项目安装gulp以及gulp插件

4.1、安装：定位目录命令后提示符执行cnpm install --save-dev；

4.2、本示例以gulp-less为例（编译less文件），命令提示符执行cnpm install gulp-less --save-dev；

4.3、将会安装在node_modules的gulp-less目录下，该目录下有一个gulp-less的使用帮助文档README.md；

4.4、为了能正常使用，我们还得本地安装gulp：cnpm install gulp --save-dev；

PS：细心的你可能会发现，我们全局安装了gulp，项目也安装了gulp，全局安装gulp是为了执行gulp任务，本地安装gulp则是为了可以通过require()调用gulp插件的功能。

5、新建gulpfile.js文件

5.1、说明：gulpfile.js是gulp项目的配置文件，是位于项目根目录的普通js文件（其实将gulpfile.js放入其他文件夹下亦可）。

5.2、gulpfile.js解释

//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'); //本地安装gulp所用到的地方
var less = require('gulp-less');
 
//定义一个lessCss任务（自定义任务名称）
gulp.task('lessCss', function () {
    gulp.src('src/less/index.less') //该任务针对的文件
        .pipe(less()) //该任务调用的模块
        .pipe(gulp.dest('src/css')); //将会在src/css下生成index.css
});
 
gulp.task('default',['lessCss', 'elseTask']); //定义默认任务
 
//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options]) 处理完后文件生成路径

6、运行gulp

6.1、说明：命令提示符执行gulp 任务名称；

6.2、编译less：命令提示符执行gulp lessCss

6.3、当执行gulp default或gulp将会调用default任务里的所有任务[lessCss,’elseTask’]。