
//根据一个筛选的条件字符串来将对应的数据筛选出来
app.filter("myFilter",function(){
	return function(goods,by){
		var _goods=[];
		
		var by=by.toLowerCase();
		
		var name='';
		var wd='';
		goods.forEach(function(good,index){
			name=good.name.toLowerCase();
			wd=good.wd.toLowerCase();
			if(name.indexOf(by)>-1||wd.indexOf(by)>-1){
				_goods.push(good)
			}
		})
		
		return _goods;
	}
})