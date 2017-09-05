
var webpack = require('webpack')

var HtmlWebpackPlugin = require("html-webpack-plugin")

//进行webpack打包的配置
module.exports = {
	//入口文件：
	entry:"./src/app.js",
	//输出位置：
	output:{
		path:__dirname+'/build',//注意，要用绝对路径
		filename:'app.js'
	},
	devServer:{//配置热更新服务器
		contentBase:'./build',
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


//new webpack.optimize.UglifyJsPlugin({
//	      compress: {
//	        warnings: false
//	      }
//	    })