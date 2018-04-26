
const http = require("https");
const fs = require("fs");
const cheerio = require('cheerio');
const superagent = require('superagent');
const axios = require("axios");
const Nightmare = require("nightmare");
const request = require("request");


const getListData = (html) => {
	return new Promise((resolve, reject) => {
		const $ = cheerio.load(html);
		// eq(1)表示只获取保温杯那块的数据
		const doms = $('.TabbedPanelsContent').eq(2).children(".TabbedPanelsContent_div")
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
			.click(".layui-flow-more")
			.evaluate(() => {
				var len = document.querySelectorAll("#LAY_demo1 li").length;
				var data = [];
				for (var i = 0; i < len; i++) {
					data.push({
						imgSrc: document.querySelector("#LAY_demo1 li:nth-child(1) a span").innerText,
						price: document.querySelector("#LAY_demo1 li:nth-child(1) a em").innerText,
						src: "https://www.cjqut.com" + document.querySelector("#LAY_demo1 li:nth-child(" + (i + 1) + ") a").getAttribute("href"),
						fengmian: "https://www.cjqut.com" + document.querySelector("#LAY_demo1 li:nth-child(" + (i + 1) + ") a div img").getAttribute("src")
					})
				}
				return data;
			})
			.end()
			.then((data) => {
				console.log(data);
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
			// var status = downfile("https://www.cjqut.com" + s, name);
			obj.img.push("https://www.cjqut.com/public/static/multiple/" + name + ".jpeg");
		}
		obj.name = $(".shop_ny_text_1").text();
		obj.xiaoliang = $(".shop_ny_text_2 .emaaad").text().split("：")[1];
		obj.price = $(".money").eq(0).text().substr(1);
		obj.shengyu = $(".stock").eq(0).text();
		obj.jieshao1 = $(".shop_ny_text_6").eq(0).text();
		obj.jieshao2 = $(".shop_ny_text_6").eq(1).text();

		var detailImageArr = $(".TabbedPanelsContent_img p");
		var num = [];
		for (var i = 0; i < detailImageArr.length - 1; i++) {
			num.push("https://www.cjqut.com" + detailImageArr.eq(i).children("img").attr("src"));
		}
		obj.detailImageArr = num;
		resolve(obj)
	})
}

const start = async () => {
	// var str="",num=[];
	// for (var i = 0; i < $("#LAY_demo1>li").length; i++) { 
	//     num.push({
	//         name: $("#LAY_demo1>li").eq(i).children("a").children('span').text(),
	//         price: $("#LAY_demo1>li").eq(i).children("a").children('em').text(),
	//         detailUrl:"https://www.cjqut.com/"+$("#LAY_demo1>li").eq(i).children("a").attr("href"),
	//         fengmian: "https://www.cjqut.com/"+$("#LAY_demo1>li").eq(i).children("a").children('div').children('img').attr("src")
	//     })
	// }
	// console.log(JSON.stringify(num));
	// // 爬取商品列表获取列表数据
	// const index = 'https://www.cjqut.com/protype.html';
	// const indexHtml = await getHtml(index);
	// const listData = await getListData(indexHtml);

	// //这个还是一个列表页面，获取每一个商品具体的详情页面
	var DetailArray = [{ "name": "美国库特无得顶日本和风系列促销美容超薄刨皮刀  KS801 ", "price": "￥38.00", "detailUrl": "https://www.cjqut.com//details/103.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180415/aa83fbb3f6084ada3b1f30a30f37e8e7.jpg" }, { "name": "美国库特无得顶日本和风系列水果套装  KS801 无得顶水果套组(3寸水果刀+削皮刀）", "price": "￥68.00", "detailUrl": "https://www.cjqut.com//details/104.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180415/e57bc6736d96aa2146911121667cfdbf.jpg" }, { "name": "美国库特TW511 qut刨皮刀土豪金礼盒", "price": "￥88.00", "detailUrl": "https://www.cjqut.com//details/68.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180329/ac7f0124c9ef9fcab3c939aba11e7b37.jpg" }, { "name": "美国库特TW511 qut 4寸水果刀土豪金礼盒", "price": "￥208.00", "detailUrl": "https://www.cjqut.com//details/69.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180329/cd917b433e49d68c76a5669f8af45d85.jpg" }, { "name": "美国库特TW511 qut 6寸多用刀土豪金礼盒", "price": "￥398.00", "detailUrl": "https://www.cjqut.com//details/71.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180329/f292a080ab4e92c46085e0016e8c2bf7.jpg" }, { "name": "美国库特法拉利红6寸TW511切片刀/万用刀土豪金礼盒", "price": "￥498.00", "detailUrl": "https://www.cjqut.com//details/72.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180329/0377553a6912a6d26e5f1cda106caec4.jpg" }, { "name": "美国库特TW511  4寸水果刀组合金色礼盒三件套", "price": "￥296.00", "detailUrl": "https://www.cjqut.com//details/73.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180329/c4b539a92a69db01c3061462956157ac.JPG" }, { "name": "奈瓷法拉利红TW709  3寸水果刀组合三件套", "price": "￥248.00", "detailUrl": "https://www.cjqut.com//details/74.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180329/85e415111778c34d9e1901a38e8b2707.JPG" }, { "name": "奈瓷锯齿形软皮削皮刀 TW709刨皮刀（锯齿口）", "price": "￥68.00", "detailUrl": "https://www.cjqut.com//details/76.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180329/67c9ae59d39e3cc98ea0c501f9cd70dd.jpg" }, { "name": "奈瓷超薄美容削皮刀  TW709刨皮刀（简装礼盒）", "price": "￥68.00", "detailUrl": "https://www.cjqut.com//details/77.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180329/73e7366cae22c0b48e4752d8a3061cdd.jpg" }, { "name": "奈瓷6寸多用刀 TW709 6寸多用刀（简装礼盒）", "price": "￥298.00", "detailUrl": "https://www.cjqut.com//details/79.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180329/ba3ed75395af7e0518d302ab8d420e43.jpg" }, { "name": "奈瓷6寸切片刀/万用刀  TW709 6寸切片刀（简装礼盒）", "price": "￥398.00", "detailUrl": "https://www.cjqut.com//details/84.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180408/5b0adadbdd6aa046edeab97e8ca334b0.jpg" }, { "name": "奈瓷香奈儿山茶花款水果套件组合 TW709山茶花三件套-黑刀紫柄", "price": "￥248.00", "detailUrl": "https://www.cjqut.com//details/96.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180412/7fcdc623586f66c0468884261a5c48f9.jpg" }, { "name": "奈瓷香奈儿山茶花款欧式厨房四件套   TW709山茶花欧式四件套-白刀粉柄（黑色豪华礼盒）", "price": "￥498.00", "detailUrl": "https://www.cjqut.com//details/102.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180415/b110a8fae72f0659a5171d34ed0292a0.jpg" }];
	// for (var i = 0, len = listData.length; i < len; i++) {
	// for (var i = 0, len = listData.length; i < len; i++) {
	// var detailUrl = await getDetailByPid("https://www.cjqut.com/product.html?name=%E5%88%80");

	// if (detailUrl) {
	// detailUrl.forEach((val) => {
	// 	console.log("反回来的详情页面的url是：" + val.src);
	// 	console.log("反回来的详情页面的封面URL是：" + val.fengmian);
	// 	DetailArray.push({
	// 		name: val.name,//商品名字
	// 		price: val.price,//商品价格
	// 		detailUrl: val.src,//商品地址
	// 		fengmian: val.fengmian,//封面图片的地址
	// 	});
	// })
	// }
	// }
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
			detailImageArr: DetailArray[i].detailImageArr,
			detailData: detailData
		});
	}
	// console.log(dataJson);

	fs.writeFile('detailData3.json', JSON.stringify(dataJson), function (err) {
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

