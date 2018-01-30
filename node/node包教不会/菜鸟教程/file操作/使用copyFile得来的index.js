var fs = require("fs");

class fileOperator {
	construct() {
		console.log("我是构造函数")
	}
	//判断是不是一个否文件
	isFile(path) {
		return new Promise((resolve, reject) => {
			fs.stat(path, (err, stats) => {
				if(err) {
					reject(err);
				}
				console.log(stats);
//				resolve(stats.isFile());
			})
		})
	}
	//判断是不是一个目录
	isDir(path) {
		return new Promise((resolve, reject) => {
			fs.stat(path, (err, stats) => {
				if(err) {
					reject(err);
				} else {
					resolve(stats.isDirectory());
				}
			})
		})
	}
	//判断文件是否存在
	
	//判断文件夹是否存在
	
	
	//读取一个目录
	readDir(path) {
		const _this = this;
		fs.readdir(path, function(err, files) {
			if(err) {
				return console.error(err);
			}
			files.forEach((file) => {
				let pageSon = `${path}/${file}`;
				console.log(pageSon);
				_this.isDir(pageSon).then((res) => {
					console.log("成功返回文件信息：" + res);
					if(res) {
						_this.readDir(pageSon);
					}
				}, (res) => {
					console.error(res);
				})
			})
		})
	}

	//读取一个文件的内容
	//生成一个文件
	//fs.writeFile(file, data[, options], callback)
	//文件描述 写入数据 
	//options - 该参数是一个对象，包含 {encoding, mode, flag}。默认编码为 utf8, 模式为 0666 ， flag 为 'w'
	buildFile(path, content) {
		return new Promise((resolve, reject) => {
			fs.writeFile(path, content, (err) => {
				if(err) {
					reject(err);
				} else {
					console.log('创建文件成功');
					resolve();
				}
			})
		})
	}
	
	//生成一个文件夹
	buildDir(path) {
		return new Promise((resolve, reject) => {
			fs.mkdir(path, (err) => {
				if(err) {
					reject(err);
				} else {
					console.log('文件夹创建成功');
					resolve();
				}
			})
		})
	}
	//删除一个文件
	deleteFile(path) {
		return new Promise((resolve, reject) => {
			fs.unlink(path, (err) => {
				if(err) {
					reject(err);
				} else {
					console.log('文件删除成功');
					resolve();
				}

			})
		})
	}
	//删除一个目录及目录下所有文件

	//复制文件
	copyFile(src, dest) {
		return new Promise((resolve, reject) => {
			fs.copyFile(src, dest, (err) => {
				if(err) {
					reject(err);
				} else {
					console.log(`${src} was copied to ${dest}`);
					resolve();
				}
			})
		})
	}

	//复制一个目录及目录下所有的文件

	//操作EXCEL
}
const FO = new fileOperator();

//FO.readDir('../遍历');
//FO.buildFile('buildFile.txt', '我是被writeFile写出来的').then((res) => {
//	FO.deleteFile('buildFile.txt');
//})
//
//FO.buildDir("被mkDir创建的文件夹");
FO.copyFile('index.js','使用copyFile得来的index.js')
