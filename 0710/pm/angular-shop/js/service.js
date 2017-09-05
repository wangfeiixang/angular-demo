	app.service("buycarService",function(){
		//获取到本地存储里购物车的数据
		this.getCar=function(){
			return localStorage.car?JSON.parse(localStorage.car):[]
		}
		//获取总价钱和总数量
		this.allInfo=function(){
			var car = this.getCar();
			var all_num=0;
			var all_price=0;
			
			car.forEach(function(good,index){
				all_num+=good.num;
				all_price+=good.num*good.price
			})
			
			return {
				all_num:all_num,
				all_price:all_price
			}
			
		}
		//添加购物车
		this.controlGood=function(callback,type,id,name,price){
			var callback=callback||function(){}
			var car = this.getCar();
			
			var isHas=false;
			
			for(var i =0;i<car.length;i++){
				if(car[i].id==id){
					if(type=='add'){
						car[i].num++;
					}else{
						car[i].num--;
						if(car[i].num<=0){
							car.splice(i,1)
						}
					}
					
					isHas=true;
					break;
				}
			}
			
			if(!isHas){
				car.push({
					id:id,
					name:name,
					price:price,
					num:1
				})
			}
						
			localStorage.car = JSON.stringify(car);
			callback();
		}
		
		//移除某一个商品
		this.removeGood=function(callback,id){
			var car = this.getCar();
			var callback=callback||function(){}
			for(var i = 0;i<car.length;i++){
				if(car[i].id==id){
					car.splice(i,1);
					break;
				}
			}

			localStorage.car = JSON.stringify(car)
			callback();
		}
		
		
	})
	
	