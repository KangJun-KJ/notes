

const path=require("path");
module.exports={
    entry :{
        entry:"./public/entry.js",
        search:"./public/search.js"
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].[hash].js'
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ]
    }
}