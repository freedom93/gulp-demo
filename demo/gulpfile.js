var gulp 		    = require('gulp');
var htmlmin     = require('gulp-htmlmin'); // 压缩html
var uglify      = require("gulp-uglify"); // 压缩js
var less        = require('gulp-less'); // less编译成css
var gulp_concat = require("gulp-concat"); // 合并文件
var cssmin      = require("gulp-minify-css"); // 压缩css
var imagemin    = require('gulp-imagemin'); // 压缩图片
var pngquant    = require('imagemin-pngquant'); // 使用pngquant深度压缩png图片的imagemin插件
var cache       = require('gulp-cache'); // 只压缩修改的图片,没有修改的图片直接从缓存文件读取（C:UsersAdministratorAppDataLocalTempgulp-cache）
var runSequence = require('gulp-run-sequence');

var lessSrc 		 = 'src/less/*.less';
var cssSrc      = 'src/css/*.css';
var cssDest 	  = 'dist/css';
var jsSrc 		  = 'src/js/*/*.js';
var jsDest 		  = 'dist/js';
var imgSrc 		  = 'src/images/*.{png,jpg,gif,ico}';
var imgDest 	  = 'dist/images';

gulp.task('miniCss',function(){
    return gulp.src([cssSrc,lessSrc])
        .pipe(less())
        .pipe(cssmin())
        .pipe(gulp.dest(cssDest));
});

gulp.task('miniJs', function() {
    return gulp.src(jsSrc)
    .pipe(uglify())
    .pipe(gulp.dest(jsDest));
});

gulp.task('miniImages', function() {
    return gulp.src(imgSrc)
        .pipe(cache(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()]
        })))
        .pipe(gulp.dest(imgDest));
});

gulp.task('miniHtml', function() {
    var options = {
        removeComments: true, //清除HTML注释
        collapseWhitespace: true, //压缩HTML
        collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
        minifyJS: true, //压缩页面JS
        minifyCSS: true //压缩页面CSS
    };
    return gulp.src('src/html/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/html'));
});

//开发构建
gulp.task('dev', function (done) {
  condition = false;
  runSequence(
     ['miniImages'],
     ['miniCss', 'miniJs'],
     ['miniHtml'],
  done);
});
//正式构建
gulp.task('build', function (done) {
  runSequence(
     ['miniImages'],
     ['miniCss', 'miniJs'],
     ['miniHtml'],
  done);
});
gulp.task('default', ['build']);