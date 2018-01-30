//Node.js 所有的异步 I/O 操作在完成时都会发送一个事件到事件队列。
//EventEmitter 的核心就是事件触发与事件监听器功能的封装。
//1、eventEmitter.on()与eventEmitter.addListener()没有区别，且一个事件可以绑定多个回调函数；
//2、若事件队列中出现一个未绑定事件则触发error事件，若未绑定 error事件则程序抛出异常结束执行
var EventEmitter = require("events");

var event = new EventEmitter.EventEmitter();

event.on("some_event", function() {
	console.log("some_event被触发了");
})

event.on("error",function(err){
	console.log("报错了");
	console.log(err);
});
setTimeout(() => {
	event.emit("some_event");
	setTimeout(() => {
		event.emit("error");
	}, 1000);
}, 1000);	