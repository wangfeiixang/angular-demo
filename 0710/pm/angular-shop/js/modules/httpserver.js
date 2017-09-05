angular.module("myHttp",[]).factory("httpservice",function($http){
		return {
			ajax:function(options){
				var symbol=options.url.indexOf("?")>-1?'&':'?'
				var url=options.dataType=='jsonp'?options.url+=symbol+'callback=JSON_CALLBACK':options.url;
				var type=options.type||'get'
				$http({
					url:url,
					method:options.dataType=='jsonp'?'jsonp':type,
					params:options.data
				}).success(options.success)
				  .error(options.error||function(err){console.log(err)})
				
			}
		}
	})