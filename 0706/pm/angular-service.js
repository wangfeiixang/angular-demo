
angular.module("servicemodule",[]).factory("httpservice",function($http){
	return {
		ajax:function(options){
			var symbol=options.url.indexOf("?")>-1?'&':'?'
			var url=options.dataType=='jsonp'?options.url+=symbol+'callback=JSON_CALLBACK':options.url;
			$http({
				url:url,
				method:options.dataType=='jsonp'?'jsonp':options.type,
				params:options.data
			}).success(options.success)
			  .error(options.error||function(err){console.log(err)})
			
		}
	}
})