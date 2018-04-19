const path=require("path");
const ExtractTextPlugin=require("extract-text-webpack-plugin");


module.exports={
    entry:'./main.js',
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'./dist')
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                //use:['style-loader','css-loader?minimize'],//minimize开启css压缩
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader",'postcss-loader']
                  })
            },
            {
                test:/\.js$/,
                use:['babel-loader']
            },
            {
            	test:/\.scss/,
            	use:ExtractTextPlugin.extract({
            		use:['css-loader', 'sass-loader']
            	})
            }
        ]
    },
    plugins:[
        new ExtractTextPlugin({
            // 从 .js 文件中提取出来的 .css 文件的名称
            filename: `[name].css`,
          }),
    ]
};