//主控制器
app.controller('appController',['$scope','$location',function($scope,$location){
	
	$scope.name = {
		user:''
	};
	$scope.pageTo = function(path){
		//console.log(path)
		$location.path(path);
	}
	$location.path('main');
	
}])

//登录页面

app.controller('loginController',['$scope','$http','$timeout','$location',function($scope,$http,$timeout,$location){
	$scope.reg = /^\w{11}$/g;
	$scope.reg1 = /^\w{6,}$/g;
	$scope.blur = function (type,ce) {
		if(type==0){
			return $scope.reg.test( ce );
		}
		if(type==1){
			return $scope.reg1.test( ce );
		}

	}
	//第一次结果是undefined

	$scope.$watch('$scope.yan',function (n,o) {

		if ( n!="undefined" && o!="undefined"){
			//console.log(1)
			$scope.yan =true;
			$scope.zheng =true;
		}
	})

	//console.log($scope.yan)

	$scope.login = function () {
		$http({
			url:'http://datainfo.duapp.com/shopdata/userinfo.php',
			params:{
				status:'login',
				userID:$scope.uname,
				password:$scope.upass
			}
		}).success( function (data) {
			console.log(data)
			switch (data){
				case "0":$scope.message='用户名不存在,请重新输入';break;
				case "2":$scope.message='用户名密码不符,请重新输入';break;
				default:$scope.message='登陆成功,2秒后跳转到首页';
					$timeout(function () {
						$location.path('main')

					},2000)
					break;

			}


		})
	}
}])

//注册页面

app.controller('registerController',['$scope','$http','$timeout','$location',function($scope,$http,$timeout,$location){
	$scope.reg = /^\w{11}$/g;
	$scope.reg1 = /^\w{6,}$/g;
	$scope.blur = function (type,ce) {
		if(type==0){
			return $scope.reg.test( ce );
		}
		if(type==1){
			return $scope.reg1.test( ce );
		}
	}
	//第一次结果是undefined
	$scope.$watch('$scope.yan',function (n,o) {

		if ( n!="undefined" && o!="undefined"){
			//console.log(1)
			$scope.yan =true;
			$scope.zheng =true;
		}
	})

	$scope.register = function () {
		$http({
			url:'http://datainfo.duapp.com/shopdata/userinfo.php',
			params:{
				status:'register',
				userID:$scope.uname,
				password:$scope.upass
			}
		}).success( function (data) {
			//console.log(data)
			switch (data){
				case "0":$scope.message='用户名重名,请重新输入';break;
				case "2":$scope.message='数据库报错';break;
				case "1":$scope.message='注册成功,2秒后跳转到登录页面';
					$timeout(function () {
						$location.path('login')

					},2000)

					break;
				default:$scope.message='下辈子再来吧';break;
			}

		})
	}
}])

app.controller('mainController',['$scope',function($scope){
	
	
	
}])

