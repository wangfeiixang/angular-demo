
//自定义的获取数据的服务，使用方法和jq一样
app.factory("myHttp",['$http',function($http){
	return function(options){
		var type=options.type||'get';
		type=options.dataType=='jsonp'?'jsonp':type;
		var symbol=options.url.indexOf('?')>-1?'&':'?';
		var jsonp=options.jsonp?options.jsonp:'callback'
		var url=type=='jsonp'?options.url+symbol+jsonp+'=JSON_CALLBACK':options.url;
		$http({
			url:url,
			method:type,
			params:options.data
		}).success(options.success)
		.error(options.error||function(err){console.log(err)})			
	}
}])

//购物车的服务，上面保存着购物车的数据，准备在任何的控制器里去使用、修改，还有一些操作购物车的方法
app.factory("car",function(){
	return {
//		buycar:JSON.parse(localStorage.buycar?localStorage.buycar:'[]')
		buycar:localStorage.car?JSON.parse(localStorage.car):[],//购物车的数据
		
		controlGoodNum:function(id,name,price,type){
			var isHas=false;
			//1.如果有这个商品，就让数量++
			if(this.buycar.length){
				for(var i=0;i<this.buycar.length;i++){
					if(this.buycar[i].id==id){
						if(type){
							this.buycar[i].num--;
							//如果购物车中某商品的数量为0的话，就把它去掉
							if(this.buycar[i].num==0){
								this.buycar.splice(i,1)
							}
						}else{
							this.buycar[i].num++;							
						}
						isHas=true;
						break;
					}
				}
			}
			
			//2.如果没有这个商品就搞一个新的放进去
			if(!isHas){
				this.buycar.push({
					id:id,
					name:name,
					price:price,
					num:1
				})
			}
			localStorage.car=JSON.stringify(this.buycar)
			
			
		},
		removeGood:function(id){//去掉某一个商品
			for(var i = 0;i<this.buycar.length;i++){
				if(this.buycar[i].id==id){
					this.buycar.splice(i,1);
					break;
				}
			}
			localStorage.car=JSON.stringify(this.buycar)
		},
		clearGood:function(){
			this.buycar=[];
			localStorage.car=JSON.stringify(this.buycar)
		},
		returnAllInfo:function(){//会返回一个对象，上面保存着购物车的总数量和总价钱
			var all_num=0;
			var all_price=0;			
			for(var i =0;i<this.buycar.length;i++){
				all_num+=this.buycar[i].num;
				all_price+=this.buycar[i].num*this.buycar[i].price
			}
			return {
				all_num:all_num,
				all_price:all_price
			}			
		}
		
		
	}
})