/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	'use strict';

	//功能的主模块
	/*
	import banner from './modules/banner'
	*/

	var mySwiperNav = new Swiper('.nav', {
		slidesPerView: 'auto',
		spaceBetween: 30
	});
	var mySwiperBanner = new Swiper('.banner', {
		pagination: '.swiper-pagination'

	});

	var timer = null;

	var myscroller = new iScroll("wrapper", {
		hScroll: false,
		bounce: true,
		bounceLock: true,
		momentum: true,
		checkDOMChanges: true,
		topOffset: 0,
		vScrollbar: true,
		fixedScrollbar: true,
		zoom: true,
		/*snap:'li',*/
		/*snapThreshold:30,*/
		onScrollStart: function onScrollStart() {
			var that = this;
			timer = setInterval(function () {
				if (that.y < -500) {
					$(".backtop").removeClass('hide');
				} else {
					$(".backtop").addClass('hide');
				}
			}, 30);
		},
		onScrollEnd: function onScrollEnd() {
			clearInterval(timer);
		}
	});

	$(".backtop").click(function () {
		myscroller.scrollTo(0, 0, 300, false);
	});

	Gtdata();

	function Gtdata() {

		$.ajax({
			type: "get",
			url: "http://localhost:1333/build/json/data.json"

		}).done(function (msg) {
			var str = "";
			for (var i = 0; i < msg.length; i++) {

				str += '<li>\n\t<div class="shop-l">\t\n        <img src="' + msg[i].src + '"/>\t\n\t</div>\t\n\t<div class="shop-m">\n\t\t<h3><span class="pp">\u54C1\u724C</span>' + msg[i].title + '</h3>\n\t\t<div class="wjx"><span>\u2605\u2605\u2605\u2605\u2605</span><span>4.5</span><span>\u6708\u552E350\u5355</span></div>\n\t\t<div><span>\uFFE50\u8D77\u9001</span><span>\u914D\u9001\u8D39\uFFE57</span><span>\uFFE547/\u4EBA</span></div>\n\t</div>\n\t<div class="shop-r">\n\t\t<dl>\n\t\t\t<dt>\u7968</dt>\n\t\t\t<dd><span>927</span>/<span>26\u5206\u949F</span></dd>\n\t\t</dl>\n\t\t\t\n   </div>\n\n  </li>';
			}

			$(".shoplist").html(str);
		});
	}

/***/ })
/******/ ]);