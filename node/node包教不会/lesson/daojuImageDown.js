var data=[
    {
        "detailUrl": "https://www.cjqut.com/details/70.html",
        "fengmian": "https://www.cjqut.com/public/static/uploads/20180329/270e8f10181b8779be222faf0cba7126.JPG",
        "detailData": {
            "img": [
                "https://www.cjqut.com/public/static/multiple/201803291602212583.jpeg"
            ],
            "name": "美国库特法拉利红健康辅食TW511 多用剪",
            "xiaoliang": "36954",
            "price": "248.00",
            "shengyu": "剩余799件",
            "jieshao1": "配送区域：全国",
            "jieshao2": "服务保障： 不支持退货 ",
            "detailImageArr": [
                "https://www.cjqut.com/ueditor/php/upload/image/20180329/1522316175594147.jpg",
                "https://www.cjqut.com/ueditor/php/upload/image/20180329/1522316175673506.jpg",
                "https://www.cjqut.com/ueditor/php/upload/image/20180329/1522316175963252.jpg",
                "https://www.cjqut.com/ueditor/php/upload/image/20180329/1522316176687550.jpg",
                "https://www.cjqut.com/ueditor/php/upload/image/20180329/1522316176654433.jpg",
                "https://www.cjqut.com/ueditor/php/upload/image/20180329/1522316177871922.jpg",
                "https://www.cjqut.com/ueditor/php/upload/image/20180329/1522316177853910.jpg",
                "https://www.cjqut.com/ueditor/php/upload/image/20180329/1522316177519181.jpg",
                "https://www.cjqut.com/ueditor/php/upload/image/20180329/1522316178733901.jpg",
                "https://www.cjqut.com/ueditor/php/upload/image/20180329/1522316178689523.jpg",
                "https://www.cjqut.com/ueditor/php/upload/image/20180329/1522316178619861.jpg"
            ]
        }
    },
    {
        "detailUrl": "https://www.cjqut.com/details/78.html",
        "fengmian": "https://www.cjqut.com/public/static/uploads/20180329/ce00be2c6066be7565db00093146402e.jpg",
        "detailData": {
            "img": [
                "https://www.cjqut.com/public/static/multiple/201803291170146526.jpeg",
                "https://www.cjqut.com/public/static/multiple/20180329227642131.jpeg"
            ],
            "name": "奈瓷健康辅食多用剪  TW709多用剪（简装礼盒）",
            "xiaoliang": "36982",
            "price": "198.00",
            "shengyu": "剩余1200件",
            "jieshao1": "配送区域：全国",
            "jieshao2": "服务保障： 不支持退货 ",
            "detailImageArr": [
                "https://www.cjqut.com/ueditor/php/upload/image/20180329/1522321368125278.jpg",
                "https://www.cjqut.com/ueditor/php/upload/image/20180329/1522321368116416.jpg",
                "https://www.cjqut.com/ueditor/php/upload/image/20180329/1522321368268883.jpg",
                "https://www.cjqut.com/ueditor/php/upload/image/20180329/1522321368301693.jpg",
                "https://www.cjqut.com/ueditor/php/upload/image/20180329/1522321368777637.jpg"
            ]
        }
    }
]

const http = require("https");
const fs = require("fs");
const cheerio = require('cheerio');
const superagent = require('superagent');
const axios = require("axios");
const Nightmare = require("nightmare");
const request = require("request");


const downfile = async (url, name) => {
    return new Promise((resolve, reject) => {
        // request.head(url, function(err, res, body){
        // 	request(url).pipe(fs.createWriteStream("./daojuImage/" + name ));
        // });
        console.log(url+"==> name="+name);
        http.get(url, function (res) {
            var imgData = "";
            res.setEncoding("binary");

            res.on("data", function (chunk) {
                imgData += chunk;
            });
            console.log(imgData);
            res.on("end", function () {
                fs.writeFile("./daojuImage2/" + name, imgData, "binary", function (err) {
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

const start = () => {
    var dData=[];
    for(var i=0;i<data.length;i++){
        dData.push(data[i].fengmian);
        for(var j=0;j<data[i].detailData.img.length;j++){
            dData.push(data[i].detailData.img[j])
        }
        for(var j=0;j<data[i].detailData.detailImageArr.length;j++){
            dData.push(data[i].detailData.detailImageArr[j])
        }
    }
    //下载轮播图里面的图片
    var i=0,len = dData.length;
    
    var timer=setInterval(() => {
        if(i>=len){
            clearInterval(timer);
            return ;
        }
        downfile(dData[i], dData[i].split("/")[dData[i].split("/").length-1]);
        i++;
    }, 201);
}

start();