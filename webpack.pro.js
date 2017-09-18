var baseConfig = require("./webpack.base.js"),
    proConfig = Object.create(baseConfig),
    webpack = require("webpack"),
    BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
    WebpackMd5Hash = require("webpack-md5-hash"),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    ExtractTextWebpackPlugin = require("extract-text-webpack-plugin"),
    OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin"),
    config = require("./appConfig.js");

proConfig.output.filename = config.assetsPath.jsDirectory + '/[name].js?_v=[chunkhash:8]';
proConfig.output.chunkFilename = config.assetsPath.jsDirectory + '/[name].js?_v=[chunkhash:8]';

proConfig.module.rules.push(
    {
        test:/\.scss$/,
        exclude:/node_modules/,
        use:ExtractTextWebpackPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader','postcss-loader','resolve-url-loader','sass-loader']
        })
    }
);

var htmlWebpackPlugins = config.pages.map(function(page){
    return new HtmlWebpackPlugin({
        filename:config.assetsPath.rootDirectory + "/" + page.name + ".html",
        template:page.template,
        chunks:["manifest","vendor",page.name],
        inject: true,
        chunksSortMode:"dependency",
        minify: {
            removeComments:true,
            collapseWhitespace:true,
            removeAttributeQuotes:true
        }
    });
});

proConfig.plugins = proConfig.plugins.concat([
    new ExtractTextWebpackPlugin({
        filename:config.assetsPath.cssDirectory + "/[name].css?_v=[chunkhash:8]"            
    }),
    new OptimizeCssAssetsPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
        name:["vendor", "manifest"],
        filename:config.assetsPath.jsDirectory +  "/[name].js?_v=[chunkhash:8]",
        minChunks: Infinity
    }),
    new webpack.HashedModuleIdsPlugin(),

    new webpack.DefinePlugin({
        'process.env': {
            // "NODE_ENV": JSON.stringify("production")
            NODE_ENV: '"production"'
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        mangle:{
            except:['exports','require']
        }
    }),
    new WebpackMd5Hash(),
    new BundleAnalyzerPlugin()
],htmlWebpackPlugins);

module.exports = proConfig;