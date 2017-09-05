
app.filter("myFilter",function(){
	return function(arr,by){
		var _arr=[];
		if(!by){return arr;}
		
		var by=by.toLowerCase();
		var name='';
		var wd='';
		arr.forEach(function(good,index){
			name=good.name.toLowerCase()
			wd=good.wd.toLowerCase()
			if(name.indexOf(by)>-1||wd.indexOf(by)>-1){
				_arr.push(good)
			}
		})
		
		return _arr
	}
})