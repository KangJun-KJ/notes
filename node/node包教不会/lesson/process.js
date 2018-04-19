const process=require("process");

//立即结束Node.js进程
//process.abort();

//返回系统的是多少位的
console.log(`This processor architecture is ${process.arch}`);

process.argv.forEach((val,index)=>{
	console.log(`${index}:${val}`);
})

process.on('exit', (code) => {
  console.log(`2.即将退出，退出码：${code}`);
});

process.on('beforeExit', (code) => {
  console.log(`1.即将退出，退出码：${code}`);
});
