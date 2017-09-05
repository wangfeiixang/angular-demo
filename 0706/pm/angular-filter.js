

angular.module("filtermodule",[]).filter("firstupper",function(){
	return function(str){
		var _str = str;
		return _str.substr(0,1).toUpperCase()+_str.substr(1).toLowerCase()
	}
}).filter("someupper",function(){
	return function(str,num){
		var _str = str;
		return _str.substr(0,num).toUpperCase()+_str.substr(num).toLowerCase()
	}
})
	