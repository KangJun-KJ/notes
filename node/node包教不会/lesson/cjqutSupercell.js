
const http = require("https");
const fs = require("fs");
const cheerio = require('cheerio');
const superagent = require('superagent');//爬虫框架
const axios = require("axios");
const Nightmare = require("nightmare");//爬虫框架
const request = require("request");


const getListData = (html) => {
	return new Promise((resolve, reject) => {
		const $ = cheerio.load(html);
		// eq(1)表示只获取保温杯那块的数据
		const doms = $('.TabbedPanelsContent').eq(1).children(".TabbedPanelsContent_div")
			.children("ul");

		var num = [], webHead = "https://www.cjqut.com";

		for (var i = 0, len = doms.length; i < len; i++) {
			var li = doms.eq(i).children("li");
			for (var j = 0, len2 = li.length; j < len2; j++) {
				var s = webHead + li.eq(j).children("a").attr("href");
				var src = webHead + li.eq(j).children("a").children("img").attr("src");
				var name = li.eq(j).children("a").children("span").text();
				num.push({
					pid: s,
					src: src,
					name: name
				});
			}
			// console.log("分割线"+i);
		}
		resolve(num);
	})

}

const getHtml = async (url) => {
	return new Promise((resolve) => {
		superagent
			.get(url)
			.end((err, pres) => {
				resolve(pres.text);
			});
	})
}

// 根据pid来获取这个商品的具体detail.html的地址
const getDetailByPid = async (pid) => {
	const nightmare = Nightmare({
		show: false,
		waitTimeout: 3000
	});//是否开启窗口
	console.log(`正在获取${pid}页面的detail数据`);
	return new Promise((resolve) => {
		nightmare
			.goto(pid)
			.wait("li")
			.evaluate(() => {
				var len = document.querySelectorAll("#LAY_demo1 li").length;
				var data = [];
				for (var i = 0; i < len; i++) {
					data.push({
						src: "https://www.cjqut.com"+document.querySelector("#LAY_demo1 li:nth-child(" + (i + 1) + ") a").getAttribute("href"),
						fengmian:"https://www.cjqut.com"+document.querySelector("#LAY_demo1 li:nth-child(" + (i + 1) + ") a div img").getAttribute("src")
					})
				}
				return data;
			})
			.end()
			.then((data) => {
				console.log( data);
				resolve(data);
			})
			.catch(error => {
				resolve("");
				console.error('Search failed:', error)
			})
	})
}

const downfile = async (url, name) => {
	return new Promise((resolve) => {
		// request.head(url, function(err, res, body){
		// 	request(url).pipe(fs.createWriteStream("./daojuImage/" + name + ".jpeg"));
		// });
		http.get(url, function (res) {
			var imgData = "";
			res.setEncoding("binary");

			res.on("data", function (chunk) {
				imgData += chunk;
			});
			console.log(imgData);
			res.on("end", function () {
				fs.writeFile("./daojuImage/" + name + ".jpeg", imgData, "binary", function (err) {
					if (err) {
						console.log(url + "down fail");
						resolve(false)
					}
					console.log("down success");
					resolve(true)
				});
			});
		})
	})
}

// 获取商品详情里面的数据
const getDeitalHtmlData = async (html) => {
	return new Promise((resolve) => {
		const $ = cheerio.load(html);
		var obj = {};
		//获取商品的图片并且下载下来
		obj.img = [];
		var imgArray = $("#home_slider .slides li");
		console.log(imgArray.length);
		for (var i = 0, len = imgArray.length; i < len; i++) {
			var s = imgArray.eq(i).children(".slide").children("img").attr("src");
			var name = s.substring(s.indexOf("multiple/") + 9, s.length - 5);
			var status = downfile("https://www.cjqut.com" + s, name);
			obj.img.push(name + ".jpeg");
		}
		obj.name = $(".shop_ny_text_1").text();
		obj.xiaoliang = $(".shop_ny_text_2 .emaaad").text().split("：")[1];
		obj.price = $(".money").eq(0).text().substr(1);
		obj.shengyu = $(".stock").eq(0).text();
		obj.jieshao1 = $(".shop_ny_text_6").eq(0).text();
		obj.jieshao2 = $(".shop_ny_text_6").eq(1).text();
		resolve(obj)
	})
}

const start = async () => {
	// // 爬取商品列表获取列表数据
	const index = 'https://www.cjqut.com/protype.html';
	const indexHtml = await getHtml(index);
	const listData = await getListData(indexHtml);

	// //这个还是一个列表页面，获取每一个商品具体的详情页面
	var DetailArray = [];
	// for (var i = 0, len = listData.length; i < len; i++) {
	for (var i = 0, len = listData.length; i < len; i++) {
		var detailUrl = await getDetailByPid(listData[i].pid);
		
		if (detailUrl) {
			detailUrl.forEach((val) => {
				console.log("反回来的详情页面的url是：" + val.src);
				console.log("反回来的详情页面的封面URL是：" + val.fengmian);
				DetailArray.push({
					pid: listData[i].pid,
					name: listData[i].name,
					src: listData[i].src,
					detailUrl: val.src,
					fengmian: val.fengmian
				});
			})
		}
	}
	console.log("我要输出来详情数据了！！！");
	console.log(DetailArray);
	// 获取详情页面的商品数据

	var dataJson = [];

	for (var i = 0, len = DetailArray.length; i < len; i++) {
		// let detailHtml = await getHtml("https://www.cjqut.com/details/44.html");
		console.log('--------正在请求的页面是:' + DetailArray[i].detailUrl);
		let detailHtml = await getHtml(DetailArray[i].detailUrl);
		let detailData = await getDeitalHtmlData(detailHtml)
		// console.log(detailData);
		dataJson.push({
			pid: DetailArray[i].pid,
			name: DetailArray[i].name,
			src: DetailArray[i].src,
			detailUrl: DetailArray[i].detailUrl,
			fengmian: DetailArray[i].fengmian,
			detailData: detailData
		});
	}
	// console.log(dataJson);

	fs.writeFile('detailData.json', JSON.stringify(dataJson), function (err) {
		if (err) {
			console.error(err);
		}
		console.log("数据写入成功！");
	})

}

start();


// .goto(url[, headers]) 跳转到url
// .viewport(width, height) 浏览器窗口大小
// .wait(selector) 等待某个dom元素出现
// .click(selector) 点击某个dom元素
// .type(selector[, text]) 在某个dom元素中输入
// .inject(type, file) 在页面上挂载 js/css 文件内容
// .evaluate(fn[, arg1, arg2,...]) 在客户端注入JS脚本并执行，从而实现

