
const math = {
	add:function(num1,num2){
		return num1+num2
	}
}

console.log('bbbb')

module.exports = math



//commonjs

//如何暴露接口  如何引入模块

//commonjs  应用于node 后端   同步

//module.exports    require()



//AMD
//  应用场景  在前端  requireJs 异步 提前加载      script——async defer
//  define(['a','b'],function(a,b){
	
//})    require()

//CMD
//  前端  同步  延迟加载  seaJS

// define(,,function(){
//	require('b')
//})
