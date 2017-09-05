//跳转页面的指令
app.directive("myLink",function(){
	return {
		restrict:'E',
		template:'<a ng-transclude></a>',
		transclude:'true',
		replace:true,
		link:function(scope,element,attrs){
			element.addClass(attrs.class)
			element.on("click",function(){
				scope.pageTo(attrs.to)
				scope.$apply()
			})
		}
	}
})
//检测ng-repeat结束的
app.directive("myFinished",function(){
	return {
		restrict:'A',
		link:function(scope,element,attrs){
			if(scope.$last){
				setTimeout(function(){
					scope[attrs.myFinished]();
				},0)
			}
		}
	}
})