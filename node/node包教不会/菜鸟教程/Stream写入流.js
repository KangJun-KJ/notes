var fs=require("fs");

var data="大家好，我是即将被输出的测试数据";

var writeStream=fs.createWriteStream("output.txt");

writeStream.write(data,'UTF8');

//标记文件末尾
writeStream.end();


writeStream.on("finish",()=>{
	console.log('写入完成了');
})

writeStream.on("error",(err)=>{
	console.log('写入报错了,%s',err);
})

console.log('程序执行完毕了。');
