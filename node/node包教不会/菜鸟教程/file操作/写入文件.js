var fs=require('fs');

console.log('准备写入文件');

fs.writeFile('input.txt','通过node中的writeFile方法写入这段文字的',function(err){
	if(err){
		return console.error(err);
	}
	console.log("数据写入成功！");
   console.log("--------我是分割线-------------")
   console.log("读取写入的数据！");
   fs.readFile('input.txt',function(err,data){
   	if(err){
		return console.error(err);
	}
   	console.log(`异步读取文件数据:${data.toString()}`)
   })
})
