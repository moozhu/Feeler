var webpack = require("webpack"),
    path = require("path"),
    config = require("./appConfig.js"),
    _ = require("lodash");

//入口文件
var entry = {
    vendor: config.vendor
};
//插件
var plugins = [];
config.pages.forEach(function (page) {
    entry[page.name] = path.resolve(__dirname, page.entry);
    if (!page.separate) return;
    page.separate.forEach(function (chunk) {
        var chunkName = chunk.slice(0, chunk.indexOf('.'));
        plugins.push(
            new webpack.optimize.CommonsChunkPlugin({
                name: page.name,
                async: chunkName,
                minChunks: function (module, count) {
                    var re = new RegExp(chunkName);
                    return module.resource && (re).test(module.resource) && count > 1;
                }
            })
        );
    });
});

module.exports = {
    entry: entry,
    output: {
        path: path.resolve(__dirname, config.assetsPath.rootDirectory + '/'),
        filename: config.assetsPath.jsDirectory + '/[name].js',
        chunkFilename: config.assetsPath.jsDirectory + '/[name].js',
        publicPath: "../"
    },
    module: {
        rules: [
            {
                test: /\.(gif|png|jpg|jpeg|woff|woff2|eot|ttf|svg)(\?t=\d+)?$/,
                exclude: /node_modules/,
                loader: "url-loader?limit=10000"
            },
            {
                test: /\.(js)?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(css)?$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        js: 'babel-loader',
                        scss: 'vue-style-loader!style-loader!css-loader!sass-loader'
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: _.assign({}, {
            "vue$": "vue/dist/vue.common.js"
        }, config.alias)
    },
    plugins: plugins
};