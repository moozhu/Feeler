var baseConfig = require("./webpack.base.js"),
    devConfig = Object.create(baseConfig),
    webpack = require("webpack"),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    copyWebpackPlugin = require("copy-webpack-plugin"),
    config = require("./appConfig.js");

devConfig.module.rules.push(
    {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'resolve-url-loader', 'sass-loader']
    }
);

var htmlWebpackPlugins = config.pages.map(function (page) {
    return new HtmlWebpackPlugin({
        filename: config.assetsPath.rootDirectory + "/" + page.name + ".html",
        template: page.template,
        chunks: ["vendor", page.name],
        inject: true,
        chunksSortMode: "dependency"
    });
});

var targetMap = {
    'js': config.assetsPath.jsDirectory + '/',
    'css': config.assetsPath.cssDirectory + '/'
};
var copy = config.copy.map(function (assets) {
    return {
        from: assets.path,
        to: targetMap[assets.type],
        flatten: true
    };
});

devConfig.plugins = devConfig.plugins.concat([
    new copyWebpackPlugin(copy),
    new webpack.optimize.CommonsChunkPlugin({
        name: ["vendor"],
        filename: config.assetsPath.jsDirectory + "/[name].js",
        minChunks: Infinity
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"development"'
        }
    })
], htmlWebpackPlugins);
devConfig.devtool = "#cheap-module-eval-source-map";

module.exports = devConfig;