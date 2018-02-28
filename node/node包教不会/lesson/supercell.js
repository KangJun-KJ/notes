var express = require('express');
var cheerio = require('cheerio');
var request = require('superagent')
var superagent = require('superagent-charset')(request)
var async = require('async');
var http = require("http");
var fs = require("fs");

var app = express();

function downfile(url, name) {
	http.get(url, function(res) {
		var imgData = "";
		res.setEncoding("binary");

		res.on("data", function(chunk) {
			imgData += chunk;
		});

		res.on("end", function() {
			fs.writeFile("./public/" + name + ".png", imgData, "binary", function(err) {
				if(err) {
					console.log("down fail");
				}
				console.log("down success");
			});
		});

	})
}
var concurrencyCount = 0,
	cnt = 0;
cardData = [];
var fetchUrl = function(url, callback) {
	concurrencyCount++;
	console.log('现在的并发数是：' + concurrencyCount);
	superagent.get(url)
		.charset()
		.end(function(err, sres) {
			if(err) {
				return next(err);
			}
			concurrencyCount--;
			var $ = cheerio.load(sres.text);
			var items = {};

			var src = $('.kpimg').children('img').attr("src");
			var name = $(".kpnames").children('b').text();
			//		console.log(name+"---"+src);
			items.name = name;
			items.src = ++cnt;
			downfile(src, cnt);
			$('.td-css1').each(function(idx, element) {
				var k = $(element).text(),
					value = $('.td-css2').eq(idx).text();
				items[k] = value;
			});
			cardData.push(items);
			callback(null, url);
		});
}
app.get('/', function(req, res, next) {
	superagent.get('http://news.4399.com/gonglue/kpct/kapai/')
		.charset()
		.end(function(err, sres) {
			if(err) {
				return next(err);
			}
			//    var $ = cheerio.load(iconv.decode(sres.text, 'utf-8'),{decodeEntities: false});
			var $ = cheerio.load(sres.text);
			console.log($);
			var urls = [];
			var cnt = 0;
			$('.listImg2>li').each(function(idx, element) {
				//    	items.push(detailLink:$(element).children('a').attr("href"))
				var href = $(element).children('a').attr("href");

				urls.push(href);
			});
			async.mapLimit(urls, 1, function(url, callback) {
				fetchUrl(url, callback);
			}, function(err, result) {
				console.log('final:');
				//				console.log(result);
				//				console.log(cardData);
				res.send(cardData);
				console.log(cardData.length);
			})
		});
});

app.listen(3001, function() {
	console.log('app is listening at port 3001');
});