//gulp
var gulp = require("gulp"),
    gulpSequence = require('gulp-sequence'),
    gutil = require("gulp-util"),
    del = require("del"),
    path = require('path'),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify"),
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    newer = require("gulp-newer"),
    sourcemaps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin');
//browser-sync
var bs = require('browser-sync').create();
//webpack
var webpack = require("webpack");
//dev-server
var express = require("express"),
    webpackDevMiddleware = require("webpack-dev-middleware"),
    webpackHotMiddleware = require("webpack-hot-middleware"),
    proxyMiddleware = require('http-proxy-middleware'),
    appConfig = require("./appConfig.js");

//清除
gulp.task('clean',function(cb){
    del.sync('dist');
    cb();
});

//图片压缩
gulp.task('copyImg',function(){
    return gulp.src('src/img/**/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img/'));
});

//复制无需编译的js文件
gulp.task('copyJs',function(){
    return gulp.src('./src/js/responsive.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'));
});

//webpack-dev-server
gulp.task('webpackDevServer',function(){
    var webpackDevConfig = require("./webpack.dev.js");

    Object.keys(webpackDevConfig.entry).forEach(function(name){
        webpackDevConfig.entry[name] = ["webpack-hot-middleware/client?noInfo=true&reload=true"].concat(webpackDevConfig.entry[name]);
    });

    webpackDevConfig.plugins = webpackDevConfig.plugins.concat([
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]);

    webpackDevConfig.devServer = {
        noInfo: true,
        publicPath:"/"
    };

    var devCompiler = webpack(webpackDevConfig);
    var devMiddleware = webpackDevMiddleware(devCompiler,{
        stats:{
            chunks: false,
            colors: true,
            timings: true,
            source: true,
            cachedAssets: false
        }
    });
    var hotMiddleware = webpackHotMiddleware(devCompiler,{});
    devCompiler.plugin('compilation', function (compilation) {
        compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
            bs.reload();
            cb();
        });
    });

    var server = express();
    server.use(devMiddleware);
    server.use(hotMiddleware);
    server.listen(3008, function(err){
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
    });
});

//webpack production
gulp.task('webpackPro',function(cb){
    var webpackProConfig = require("./webpack.pro.js");
    webpack(webpackProConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:production", err);
        gutil.log("[webpack:production]", stats.toString({
            chunks: false,
            colors: true,
            timings: true,
            source: true,
            cachedAssets: false
        }));
        cb();
    });
});

//browserSync
gulp.task('proxy-server',function(){
    bs.init({
        startPath: "/dist/app.html",
        port: appConfig.port,
        proxy: "http://localhost:3008"
    });
});

gulp.task('buildSuccess',function(cb){
    gutil.log("[webpack:production]","build success!");
    cb();
});

gulp.task('build',gulpSequence('clean','copyImg','copyJs','webpackPro','buildSuccess'));
gulp.task("dev-server",gulpSequence('webpackDevServer','proxy-server'));
