
//最外层的控制器，在这里主要控制头部和登陆信息
app.controller("appController",["$scope",function($scope){
//	保存了一条数据，是登陆的用户名的信息，准备在很多地方去显示或者作为判断的依据
	$scope.appdata={
		username:''
	}
	//注销的操作
	$scope.exit=function(){
		$scope.appdata.username=''
	}
}])

app.controller("loginController",["$scope",'myHttp','$timeout','$location',function($scope,myHttp,$timeout,$location){
	$scope.message='';
	$scope.login=function(){
		myHttp({
			url:'http://datainfo.duapp.com/shopdata/userinfo.php',
			data:{
				status:"login",
				userID:$scope.username,
				password:$scope.password
			},
			success:function(data){
				if(data==0){
					$scope.message='用户名不存在'
				}else if(data==2){
					$scope.message='密码错误'
				}else{
					$scope.message='登陆成功';
					$timeout(function(){
						//保存登陆的用户名
						$scope.appdata.username=$scope.username;
						$location.path('main')
					},800)
				}
			}
		})
	}
	
}])

app.controller("registerController",["$scope",'myHttp','$timeout','$location',function($scope,myHttp,$timeout,$location){
	$scope.message='';
	$scope.register=function(){
		myHttp({
			url:'http://datainfo.duapp.com/shopdata/userinfo.php',
			data:{
				status:"register",
				userID:$scope.username,
				password:$scope.password
			},
			success:function(data){
				if(data==0){
					$scope.message='用户名已存在'
				}else if(data==2){
					$scope.message='不好意思出错了'
				}else{
					$scope.message='注册成功';
					$timeout(function(){
						$location.path('login')
					},800)
				}
			}
		})
	}
	
}])

//M层数据改变V层进行更新，M层必须是要挂载VM上 作用域上
app.controller("mainController",["$scope",'myHttp','car',function($scope,myHttp,car){
	//商品列表信息
	$scope.goods=[];
	//input筛选条件字符串准备数据双向绑定的数据
	$scope.filterBy='';
	//获取到购物车的总价钱和总数量。因为下面会监听，在开始监听的时候会执行一次，所以在这就不需要执行了
//	$scope.all_info=car.returnAllInfo();
	//加入购物车
	
	
	
	$scope.add=function(id,name,price){
		car.controlGoodNum(id,name,price);
	}
	//将购物车先挂到$scope上，这样，$watch才能监听到...
	$scope.buycar = car.buycar;
	//监听数据的改变，然后更改总价钱和总数量
	$scope.$watch('buycar',function(){
		$scope.all_info=car.returnAllInfo();
	},true)
	
	myHttp({
		url:'./json/goods.json',
		success:function(data){
			$scope.goods=data
		}
	})
}])

app.controller("detailController",["$scope","$routeParams",'myHttp','car',function($scope,$routeParams,myHttp,car){
	//根据传入的id来获取到对应的数据挂在scope上
	$scope.good={};
	$scope.goodInfo=[];

	$scope.all_info=car.returnAllInfo();
	//加入购物车操作
	$scope.addGood=function(id,name,price){
		car.controlGoodNum(id,name,price);
		$scope.all_info=car.returnAllInfo();
	}
	//从购物车移除
	$scope.removeGood=function(id){
		car.removeGood(id);
		$scope.all_info=car.returnAllInfo();
	}
	myHttp({
		url:'./json/goods.json',
		success:function(data){
			angular.forEach(data,function(good,index){
				if(good.id==$routeParams.id){
					$scope.good=good;
				}
			})		
			
			for(var key in $scope.good){
				switch(key){
					case 'hlb':$scope.goodInfo.push({name:'胡萝卜素',imgUrl:'img/r'+$scope.good[key]+'.png',des:returnDes($scope.good[key])});break;
					case 'vc':$scope.goodInfo.push({name:'VC',imgUrl:'img/r'+$scope.good[key]+'.png',des:returnDes($scope.good[key])});break;
					case 'ys':$scope.goodInfo.push({name:'叶酸',imgUrl:'img/r'+$scope.good[key]+'.png',des:returnDes($scope.good[key])});break;
					case 'jia':$scope.goodInfo.push({name:'钾',imgUrl:'img/r'+$scope.good[key]+'.png',des:returnDes($scope.good[key])});break;
					case 'qws':$scope.goodInfo.push({name:'纤维素',imgUrl:'img/r'+$scope.good[key]+'.png',des:returnDes($scope.good[key])});break;
				}
			}
		}
	})
}])






app.controller("carController",["$scope","car",function($scope,car){
	$scope.all_info=car.returnAllInfo();
	$scope.buycar = car.buycar;
	//加减购物车
	$scope.controlGood=function(id,name,price,type){
		car.controlGoodNum(id,name,price,type);
		$scope.buycar = car.buycar;
		$scope.all_info=car.returnAllInfo();
	}
	//清空购物车
	$scope.clearGood=function(){
		car.clearGood()
		$scope.all_info=car.returnAllInfo();
		$scope.buycar = car.buycar;
	}
	
}])



function returnDes(num){
	
	switch(num){
		case '0':return '微乎其微(低于5%)';break;
		case '1':return '含量低(5 ~ 10%)';break;
		case '2':return '平均水平(10 ~ 20%)';break;
		case '3':return '含量高(20~40%)';break;
		case '4':return '富含(高于40%)';break;
	}
	
	
}
