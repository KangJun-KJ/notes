var fs=require("fs");

console.log("准备打开文件！");
fs.open("../input.txt",'r+',function(err,fd){
	if(err){
		return console.error(err);
	}
	console.log('文件打开成功');
})

//获取文件信息
//stats.isFile();//如果是文件返回true,否则返回false
//stats.isDirectory();是目录返回true
//stats.isBlockDevice() 是否块设备
//stats.isCharacterDevice() 字符设备
//stats.isSymbolicLink() 是否软连接
//stats.isFIFO() 是FIFO
//stats.isSocket() 是否socket


fs.stat("../../lesson",function(err,stats){
	console.log("打印读取文件或者文件夹的信息");
	console.log(stats);
	console.log(stats.isFile());
});




