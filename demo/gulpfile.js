var gulp 		    = require('gulp');
var htmlmin     = require('gulp-htmlmin'); // 压缩html
var uglify      = require('gulp-uglify'); // 压缩js
var less        = require('gulp-less'); // less编译成css
var concat      = require('gulp-concat'); // 合并文件
var minifyCss   = require('gulp-minify-css'); // 压缩css
var imagemin    = require('gulp-imagemin'); // 压缩图片
var pngquant    = require('imagemin-pngquant'); // 使用pngquant深度压缩png图片的imagemin插件
var cache       = require('gulp-cache'); // 只压缩修改的图片,没有修改的图片直接从缓存文件读取（C:UsersAdministratorAppDataLocalTempgulp-cache）
var runSequence = require('gulp-run-sequence'); 
var rev         = require('gulp-rev-append'); // 给URL自动添加MD5版本号
var autoprefixer= require('gulp-autoprefixer');
var del         = require('del');
var livereload  = require('gulp-livereload'); // 自动更新页面
var webpack     = require('gulp-webpack');
// cnpm install --save-dev gulp gulp-htmlmin gulp-uglify gulp-less gulp-concat gulp-minify-css gulp-imagemin 
// cnpm install --save-dev imagemin-pngquant gulp-cache gulp-run-sequence 
// cnpm install --save-dev gulp-autoprefixer
// cnpm install --save-dev del

var htmlSrc     = 'src/html/*.html';
var htmlDest    = 'dist/html';
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
    return gulp.src(htmlSrc)
        .pipe(htmlmin(options))
        .pipe(rev())
        .pipe(gulp.dest(htmlDest));
});

var cssSrc     = 'src/css/*.css';
var cssDest    = './dist/css';
gulp.task('miniCss',function(){
    return gulp.src(cssSrc)
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true 
        }))
        // .pipe(less())
        .pipe(rev())
        // .pipe(cssmin())
        .pipe(gulp.dest(cssDest));
});

gulp.task('miniJs', function() {
    return gulp.src(['src/js/*/*.js','src/js/*.js'])
    // .pipe(concat('all.js'))//合并后的文件名
    // .pipe(uglify())
    .pipe(uglify({
        mangle: true,//类型：Boolean 默认：true 是否修改变量名
        compress: true//类型：Boolean 默认：true 是否完全压缩
        // preserveComments: all //保留所有注释
    }))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('miniImages', function() {
    gulp.src(['src/images/*/*.{png,jpg,gif,ico}','src/images/*.{png,jpg,gif,ico}'])
        .pipe(cache(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('build', function(done) {
  runSequence(
    ['miniImages'],
    ['miniCss','miniJs'],
    ['miniHtml'],
    done);
});

gulp.task('default', ['build']);