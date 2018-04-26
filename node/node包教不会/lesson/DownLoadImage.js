var https = require("https");
var fs = require("fs");
var async = require('async');

var concurrencyCount = 0;
function downPictrue(url,callback) {
    concurrencyCount++;
    console.log('现在的并发数是：' + concurrencyCount);
    https.get(url, function (res) {
        var imgData = "";
        res.setEncoding("binary");

        res.on("data", function (chunk) {
            imgData += chunk;
        });

        res.on("end", function () {
            fs.writeFile("./test/1.png", imgData, "binary", function (err) {
                if (err) {
                    console.log("down fail");
                }
                console.log("down success");
                concurrencyCount--;
                callback(null,url);
            });
        });

    })
}

function start(){
    var data=new Array(30).fill("https://www.baidu.com/img/bd_logo1.png");
    async.mapLimit(data, 3, function(url, callback) {
        downPictrue(url, callback);
    }, function(err, result) {
        console.log('final complete');
    });
}

start();