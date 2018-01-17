var axios = require('axios')
var express = require("express");
var app = express();

app.get('/', function(req, res) {
	
	axios.get("http://dwadd.duowan.com/?r=card/getlist&&type=JSONP&order_type=card_sort&callback=jQuery112107945500134184249_1516190431836&_=1516190431837")
		.then(function(response) {
			res.send(response.data);
			console.log(response.data);
		})
	
})

var server = app.listen(8081, function() {
	var host = server.address().address
	var port = server.address().port

	console.log("应用实例，访问地址为 http://%s:%s", host, port)

})

//card_id: "249", 
//card_en_name: "Royal+Ghost", 英文名字
//card_alias: "幽灵",       	   //别名
//card_en_alias: "Ghost",	  //英文别名
//card_name: "皇家幽灵",		  //中文名字
//image: "http://s1.dwstatic.com/crka/60/00/60004909f81fb5468205153d576fc3226293.png",
//phase: "10",
//rarity: "4",
//card_type: "1",
//holywater: "3",
//intro: "一个在竞技场中游荡的隐形幽灵，当他被敌人惊醒后，便会显形并发动攻击！解决了当前的敌人后，他会再次隐身继续呼呼大睡！",
//attribute: "{"level_attribute":null,"fixed_attribute":null}",
//card_sort: "136",
//detail_url: "http://cr.duowan.com/1712/377026026876.html",
//card_img_en_name: null,
//last_update_time: "2017-12-22 17:48:15"