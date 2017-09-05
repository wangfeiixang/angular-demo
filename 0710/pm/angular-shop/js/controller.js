
//body上挂载的最大的控制器
app.controller("appController",['$scope','$location',function($scope,$location){
	//外层控制器上挂载的数据，可以在多个控制器间使用
	$scope.appdata={
		username:''//登陆后的用户信息
	}
	//跳转页面的方法
	$scope.pageTo=function(path){
		$location.path(path);
	}
	//注销的方法
	$scope.exit=function(){
		$scope.appdata.username='';
	}
}])

//首页的控制器
app.controller("mainController",['$scope','httpservice','buycarService',function($scope,httpservice,buycarService){
	//获取总价钱等
	$scope.allInfo=buycarService.allInfo();
	//获取商品数据
	httpservice.ajax({
		url:'json/goods.json',
		success:function(result){
			$scope.dataList=result
		}
	})
	//当ng-repeat执行完成后，实例化iscroll
	$scope.finished=function(){
		var myScroll = new iScroll("wrapper")
	}
	//加入购物车
	$scope.addGood=buycarService.controlGood.bind(buycarService,function(){
		$scope.allInfo=buycarService.allInfo()
	},'add')
	
}])

app.controller("detailController",['$scope','httpservice','buycarService','$routeParams',function($scope,httpservice,buycarService,$routeParams){
	//获取总价钱等
	$scope.allInfo=buycarService.allInfo();
	httpservice.ajax({
		url:'json/goods.json',
		success:function(result){
			for(var i=0;i<result.length;i++){
				if(result[i].id==$routeParams.id){
					$scope.good=result[i];
					break;
				}
			}
			
			$scope.good_info=returnInfo($scope.good);			
		}
	})
	//添加购物车
	$scope.addGood=buycarService.controlGood.bind(buycarService,function(){
		$scope.allInfo=buycarService.allInfo()
	},'add')
	
	//从购物车移除
	$scope.removeGood=buycarService.removeGood.bind(buycarService,function(){
		$scope.allInfo=buycarService.allInfo()
	})
}])

app.controller("carController",['$scope','buycarService',function($scope,buycarService){	
	//获取总价钱等
	$scope.allInfo=buycarService.allInfo();
	
	$scope.car = buycarService.getCar()
	
	//添加购物车
	$scope.addGood=buycarService.controlGood.bind(buycarService,function(){
		$scope.allInfo=buycarService.allInfo()
		$scope.car = buycarService.getCar()
	},'add')
	//减少购物车
	$scope.reduceGood=buycarService.controlGood.bind(buycarService,function(){
		$scope.allInfo=buycarService.allInfo()
		$scope.car = buycarService.getCar()
	},'reduce')
}])


function returnInfo(info){
	var arr=[];
	for(var key in info){
		switch(key){
			case 'hlb':
				arr.push({title:'胡萝卜素',des:returnDescription(info[key]),imgUrl:'img/r'+info[key]+'.png'});break;
			case 'vc':
				arr.push({title:'VC',des:returnDescription(info[key]),imgUrl:'img/r'+info[key]+'.png'});break;
			case 'ys':
				arr.push({title:'叶酸',des:returnDescription(info[key]),imgUrl:'img/r'+info[key]+'.png'});break;
			case 'jia':
				arr.push({title:'钾',des:returnDescription(info[key]),imgUrl:'img/r'+info[key]+'.png'});break;
			case 'xws':
				arr.push({title:'纤维素',des:returnDescription(info[key]),imgUrl:'img/r'+info[key]+'.png'});break;
		}
	}
	
	return arr;
}

function returnDescription(num){
	var description=''
	switch(num){
		case '0':description='微乎其微(低于5%)';break;
		case '1':description='含量低(5 ~ 10%)';break;
		case '2':description='平均水平(10 ~ 20%)';break;
		case '3':description='含量高(20~40%)';break;
		case '4':description='富含(高于40%)';break;
	}
	return description;
}









app.controller("loginController",['$scope','$http','$location','$timeout',function($scope,$http,$location,$timeout){
	$scope.message='';
	$scope.login=function(){
		$http({
			url:'http://datainfo.duapp.com/shopdata/userinfo.php',
			params:{
				status:'login',
				userID:$scope.uname,
				password:$scope.upass
			}
		}).success(function(result){
			if(result.userID){
				$scope.appdata.username=result.userID
				$scope.message='登陆成功';
				$timeout(function(){
					$location.path('main')
				},1000)
				
			}else{
				$scope.message='登陆失败';
				$scope.uname='';
				$scope.upass=''
			}
		})
	}
}])

app.controller("registerController",['$scope','$http','$location','$timeout',function($scope,$http,$location,$timeout){
	$scope.message='';
	$scope.register=function(){
		$http({
			url:'http://datainfo.duapp.com/shopdata/userinfo.php',
			params:{
				status:'register',
				userID:$scope.uname,
				password:$scope.upass
			}
		}).success(function(result){
			if(result==1){
				$scope.message='注册成功';
				$timeout(function(){
					$location.path('login')
				},1000)
				
			}else{
				$scope.message='注册失败';
				$scope.uname='';
				$scope.upass=''
			}
		})
	}
}])

