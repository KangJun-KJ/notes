
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
        waitTimeout: 10000
    });//是否开启窗口
    console.log(`正在获取${pid}页面的detail数据`);
    return new Promise((resolve) => {
        var Cdata = [];
        nightmare
            .goto(pid)
            .wait(3000)
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
            .then((data) => {
                console.log(data);
                Cdata.push(data);
                // resolve(data);
            })
            .wait(3000)
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
            .then((data) => {
                console.log(data);
                Cdata.push(data);
                resolve(Cdata);
            })
            .end()
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
    // // 爬取商品列表获取列表数据
    // const index = 'https://www.cjqut.com/protype.html';
    // const indexHtml = await getHtml(index);
    // const listData = await getListData(indexHtml);

    // //这个还是一个列表页面，获取每一个商品具体的详情页面
    var DetailArray = [];
    // for (var i = 0, len = listData.length; i < len; i++) {
    // for (var i = 0, len = listData.length; i < len; i++) {
    // var detailUrl = await getDetailByPid("https://www.cjqut.com/product.html?name=%E6%9D%AF");

    // // if (detailUrl) {
    // 	detailUrl.forEach((val) => {
    // 		console.log("反回来的详情页面的url是：" + val.src);
    // 		console.log("反回来的详情页面的封面URL是：" + val.fengmian);
    // 		DetailArray.push({
    // 			name: val.name,//商品名字
    // 			price: val.price,//商品价格
    // 			detailUrl: val.src,//商品地址
    // 			fengmian: val.fengmian,//封面图片的地址
    // 		});
    // 	})
    // }
    // }
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
    var str = [{ "name": "美国库特双层不锈钢吸管杯ETT502-35", "price": "￥268.00", "detailUrl": "https://www.cjqut.com//details/44.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180328/5beb8eda986423cd10b6cb47fb1b060f.jpg" }, { "name": "美国库特双层高真空弹盖提手杯 TTB510-45", "price": "￥168.00", "detailUrl": "https://www.cjqut.com//details/48.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180329/bdff6974f3c32446a2237576446d96f9.jpg" }, { "name": "美国库特双层不锈钢高真空保温茶滤养生杯FQT503-45", "price": "￥258.00", "detailUrl": "https://www.cjqut.com//details/45.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180328/2bf63e1d1cdd59167056756a5c0e9b20.jpg" }, { "name": "美国库特品牌350ml高真空子弹头保温杯 ZDT710-35", "price": "￥158.00", "detailUrl": "https://www.cjqut.com//details/99.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180415/7cdfd38d31449fdf11eb4ebb4082c12d.JPG" }, { "name": "美国库特品牌500ml高真空子弹头保温杯 ZDT710-50", "price": "￥178.00", "detailUrl": "https://www.cjqut.com//details/100.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180415/b743d5d24f6f6afe567afe2b35c53bd5.jpg" }, { "name": "美国库特品牌480ml高真空保温运动杯 YDP710-48", "price": "￥218.00", "detailUrl": "https://www.cjqut.com//details/101.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180415/4f323f5ed1bf2dd049896ecb1c52cbfc.JPG" }, { "name": "美国库特双层不锈钢高真空平盖杯 PGG705-30", "price": "￥295.00", "detailUrl": "https://www.cjqut.com//details/49.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180329/e09b19809e5d621e32f300a1a2e3b357.jpg" }, { "name": "美国库特双层不锈钢高真空平盖杯 PGZ506-36", "price": "￥336.00", "detailUrl": "https://www.cjqut.com//details/50.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180329/0a2ff75022ce0bcc81d7eb5a7e44d07e.jpg" }, { "name": "美国库特双层不锈钢高真空弹盖杯 TTZ704-48", "price": "￥395.00", "detailUrl": "https://www.cjqut.com//details/51.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180329/73a3f0cf3f01dcb31ee933c340b0b1fe.jpg" }, { "name": "美国库特双层不锈钢高真空平盖杯 PGZ506-48", "price": "￥386.00", "detailUrl": "https://www.cjqut.com//details/52.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180329/186488ac8224fe5285eed5631de12651.JPG" }, { "name": "美国库特双层不锈钢高真空弹盖杯 TGZ506-36", "price": "￥418.00", "detailUrl": "https://www.cjqut.com//details/53.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180329/115af0bc43d5a2ded6ff4eadb35ad0de.jpg" }, { "name": "美国库特双层不锈钢高真空弹盖杯TGZ506-48", "price": "￥468.00", "detailUrl": "https://www.cjqut.com//details/54.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180329/8733c070054d0c610941907347a3df56.JPG" }, { "name": "美国库特双层水晶玻璃杯 SH550-200-PK", "price": "￥208.00", "detailUrl": "https://www.cjqut.com//details/55.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180415/19c6c89f1921bbc44eafae30d3b11ed2.JPG" }, { "name": "美国库特单层水晶玻璃杯 DH507-300-BL", "price": "￥188.00", "detailUrl": "https://www.cjqut.com//details/56.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180329/f3f7bf256946ffb1c4cdf14fa349495c.jpg" }, { "name": "美国库特双层水晶玻璃杯 SH105-280-ARD", "price": "￥258.00", "detailUrl": "https://www.cjqut.com//details/57.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180415/b5921ea3293eb317668720ba0e8c849b.JPG" }, { "name": "美国库特双层水晶弧形玻璃杯 SH562-290-BK", "price": "￥288.00", "detailUrl": "https://www.cjqut.com//details/58.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180416/a5d47a7192396f38679a8db580b03164.jpg" }, { "name": "美国库特单层水晶玻璃杯 DH612-490-SL", "price": "￥258.00", "detailUrl": "https://www.cjqut.com//details/59.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180329/a6e43653f35495326ede9bd39c016af3.jpg" }, { "name": "美国库特双层水晶玻璃杯 SH026-310-CGY", "price": "￥486.00", "detailUrl": "https://www.cjqut.com//details/60.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180329/c0f15d72b69e7fbca220af01b6a87b7c.jpg" }, { "name": "美国库特双层水晶玻璃杯 SH116-360-CGY", "price": "￥288.00", "detailUrl": "https://www.cjqut.com//details/61.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180415/7bf8b3e134c9c660968fc4ec0bb9845c.JPG" }, { "name": "美国库特双层水晶玻璃杯 SH215-280-BL", "price": "￥308.00", "detailUrl": "https://www.cjqut.com//details/62.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180415/0d849a6a6aaab41afce92012c76ada80.JPG" }, { "name": "美国库特双层水晶玻璃杯 SH351-280-BK", "price": "￥408.00", "detailUrl": "https://www.cjqut.com//details/63.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180329/ec1c47ed7b8079d56392563cdd409e65.jpg" }, { "name": "美国库特双层水晶玻璃杯SH375L-350-SL", "price": "￥508.00", "detailUrl": "https://www.cjqut.com//details/64.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180415/4e9ae30b2892ba382eabd1276a124477.JPG" }, { "name": "美国库特双层水晶玻璃杯 SH371-280-SBK", "price": "￥416.00", "detailUrl": "https://www.cjqut.com//details/65.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180415/ce4a987c5e1d101280b45a512eaf8cd6.JPG" }, { "name": "美国库特双层水晶玻璃杯 SH552L-380-BK", "price": "￥486.00", "detailUrl": "https://www.cjqut.com//details/66.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180329/e0a6c5c5d54984ac7b569839512262a3.jpg" }, { "name": "膳魔师高真空不锈钢隔层保温杯CMC-401", "price": "￥250.00", "detailUrl": "https://www.cjqut.com//details/85.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180408/34acd53f4690cff6c7bae598a042ea32.JPG" }, { "name": "膳魔师高真空保温易握杯 JCG-400C", "price": "￥225.00", "detailUrl": "https://www.cjqut.com//details/86.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180408/130fc4841c6d8567b90e2cdab4ba5ab5.jpg" }, { "name": "膳魔师不锈钢真空保温茶滤杯 JML-370", "price": "￥285.00", "detailUrl": "https://www.cjqut.com//details/87.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180408/807de1673d808c7f9ae9895f8035d43b.JPG" }, { "name": "膳魔师不锈钢真空保温茶滤杯CMK-501 ", "price": "￥330.00", "detailUrl": "https://www.cjqut.com//details/88.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180408/52a698f0f1e5718e4ba72c0b524f86f3.jpg" }, { "name": "膳魔师进口高真空超轻弹盖保温杯 JNL-352", "price": "￥395.00", "detailUrl": "https://www.cjqut.com//details/89.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180408/1c011223c271ed03975c98e1becda1c4.jpg" }, { "name": "膳魔师马来西亚进口500ml双层高真空 不锈钢保温弹盖杯\\汽车杯 JMY-503", "price": "￥395.00", "detailUrl": "https://www.cjqut.com//details/90.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180408/faeeddcc20f710693e72d45abede8fba.jpg" }, { "name": " 膳魔师不锈钢男女士保温杯办公水杯 SK-1000-CBW", "price": "￥268.00", "detailUrl": "https://www.cjqut.com//details/91.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180408/1ee521aca82d7d20b7d072f56b770f80.jpg" }, { "name": "日本象印双层高不锈钢真空保温杯 SM-AGE35", "price": "￥418.00", "detailUrl": "https://www.cjqut.com//details/105.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180415/dd72182c50e27987b75919fa6597f54e.jpg" }, { "name": "日本象印双层高不锈钢真空保温杯 SM-AGE50", "price": "￥458.00", "detailUrl": "https://www.cjqut.com//details/106.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180415/210e761417ec810836a2a167870d9ad9.jpg" }, { "name": "日本象印双层高真空不锈钢保温杯 SM-JD36 ", "price": "￥508.00", "detailUrl": "https://www.cjqut.com//details/107.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180415/24fa764edc077e31e0a6d92439f8788b.jpg" }, { "name": "日本象印双层高真空不锈钢保温杯SM-JD48 ", "price": "￥538.00", "detailUrl": "https://www.cjqut.com//details/108.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180415/3c854d396db2b135751d9da5ed16bd88.jpg" }, { "name": "日本象印双层高真空不锈钢弹盖保温杯 SM-KB36", "price": "￥598.00", "detailUrl": "https://www.cjqut.com//details/109.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180415/4df1b23500734e75bdf4a5b51c902117.jpg" }, { "name": "日本象印双层高真空不锈钢弹盖保温杯 SM-KB48", "price": "￥638.00", "detailUrl": "https://www.cjqut.com//details/110.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180415/b6ead42b52b9d36663cfac7833bed8f8.jpg" }, { "name": "象印焖烧杯不锈钢真空进口焖烧罐 SW-EAE50", "price": "￥598.00", "detailUrl": "https://www.cjqut.com//details/111.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180415/f0473e14457b1fee6649797cb043b460.jpg" }, { "name": "虎牌标不锈钢真空保温学士杯 MBJ-C06C", "price": "￥598.00", "detailUrl": "https://www.cjqut.com//details/116.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180415/0dcf0cfd80268f2cff3ad65a0ea0ff94.jpg" }, { "name": "虎牌儿童型不锈钢真空保温杯MBR-S06C", "price": "￥698.00", "detailUrl": "https://www.cjqut.com//details/117.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180415/83a068675837a0488815575d3f03f0e5.jpg" }, { "name": "虎牌养生茶虑保温杯MCA-T48C ", "price": "￥568.00", "detailUrl": "https://www.cjqut.com//details/119.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180415/af38ab14ace56832c7689c604254b7b8.jpg" }, { "name": "虎牌日本制不锈钢真空杯 MJA-A036", "price": "￥538.00", "detailUrl": "https://www.cjqut.com//details/121.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180415/fa80b5d1316e827757c24f47e6033848.jpg" }, { "name": "虎牌日本制不锈钢真空杯MJA-A048", "price": "￥578.00", "detailUrl": "https://www.cjqut.com//details/122.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180415/f708565c5b646f17c54178f7a283c405.jpg" }, { "name": "虎牌单手易开型不锈钢真空杯MMQ-S50C", "price": "￥468.00", "detailUrl": "https://www.cjqut.com//details/123.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180415/94b0aaaed7ede464dde84b435c293809.jpg" }, { "name": "虎牌单手易开型不锈钢真空杯MMQ-S35C", "price": "￥438.00", "detailUrl": "https://www.cjqut.com//details/124.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180415/79ebb1459ad540ee9b05061c0e047a02.jpg" }, { "name": "虎牌轻量型不锈钢真空杯 MMY-A48C", "price": "￥598.00", "detailUrl": "https://www.cjqut.com//details/125.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180415/50d84dccc5201d73de41cffb8c283b30.jpg" }, { "name": "虎牌轻量不锈钢真空杯MMY-A36C", "price": "￥568.00", "detailUrl": "https://www.cjqut.com//details/126.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180415/f541c6a953a3e433533894ed1bdf7d2e.jpg" }, { "name": "Tiger虎牌保温杯男女士不锈钢真空杯商务办公杯原装进口水杯MJC-A036 360ml", "price": "￥496.00", "detailUrl": "https://www.cjqut.com//details/128.html", "fengmian": "https://www.cjqut.com//public/static/uploads/20180416/3a328ac7f37c0872879e7c8356ca8831.jpg" }];
    DetailArray = str;
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

    fs.writeFile('detailData4.json', JSON.stringify(dataJson), function (err) {
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

