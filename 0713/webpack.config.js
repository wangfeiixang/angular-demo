/**
 * Created by Wang on 2017/7/13.
 */

var webpack = require('webpack')

var HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports={
    entry:"./src/app.js",
    output:{
        filename:'app.js',
        path:__dirname+"/bulid"
    },
    devServer:{//配置热更新服务器
        contentBase:'./bulid',
        host:'localhost',
        port:9000,
        historyApiFallback:false
    },
    plugins:[

        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html'
        })

    ]


}