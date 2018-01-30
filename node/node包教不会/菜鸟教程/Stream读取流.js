//Stream 是一个抽象接口，Node 中有很多对象实现了这个接口。
//例如，对http 服务器发起请求的request 对象就是一个 Stream，还有stdout（标准输出）。
var fs=require("fs");
var data="";

var readStream=fs.createReadStream('input.txt');

readStream.setEncoding("UTF8");

readStream.on("data",function(chunk){
	console.log(chunk);
	data+=chunk;
})

readStream.on("end",()=>{
	console.log("读取结束：%s",data);
});

readStream.on("error",(err)=>{
	console.log(`读取出错了:${err}`);
});

console.log("程序执行完毕了");
