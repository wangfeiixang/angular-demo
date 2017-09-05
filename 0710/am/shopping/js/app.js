
//主模块
var app = angular.module('myapp',['ngRoute'])

//配置路由..
app.config(['$routeProvider',function($routeProvider){
	
	$routeProvider.when('/main',{
		templateUrl:'./template/main.html',
		controller:'mainController'
	}).when('/login',{
		templateUrl:'./template/login.html',
		controller:'loginController'
	}).when('/register',{
		templateUrl:'./template/register.html',
		controller:"registerController"
	}).when('/detail',{
		templateUrl:'./template/detail.html',
		controller:'detailController'
	}).when('/car',{
		templateUrl:'./template/car.html',
		controller:"carController"
	}).otherwise({
		redirectTo:'/main'
	})
	
	
}])
