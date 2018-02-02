var webpack = require('webpack');
module.exports = {
    devtool: 'eval-source-map',
    entry: "./index.js",
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: "./",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('菜鸟教程 webpack 实例')
    ]
}