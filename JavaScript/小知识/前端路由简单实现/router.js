function FrontRouter(){
	this.routes={};
	window.addEventListener('load',this.resolve.bind(this),false);
	window.addEventListener('hashchange',this.resolve.bind(this),false);
}

FrontRouter.prototype.route=function(path,callback){
	this.routes[path]=callback||function(){};
}

FrontRouter.prototype.resolve=function(){
	this.curHash=location.hash.slice(1)||'/';
	typeof this.routes[this.curHash] === 'function' && this.routes[this.curHash]();
}