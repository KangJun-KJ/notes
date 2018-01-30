var fs = require("fs");

class fileOperator {
	construct() {
		console.log("我是构造函数")
	}
	//判断是不是一个否文件
	isFile(path) {
		const _this = this;
		return new Promise((resolve, reject) => {
			_this.isFileExit(path).then((res) => {
				fs.stat(path, (err, stats) => {
					if(err) {
						reject(err);
					}
					resolve(stats.isFile());
				})
			}, (res) => {
				console.log('文件不存在不存在');
				reject();
			})
		})
	}
	//判断是不是一个目录
	isDir(path) {
		const _this = this;
		return new Promise((resolve, reject) => {
			_this.isFileExit(path).then((res) => {
				fs.stat(path, (err, stats) => {
					if(err) {
						reject(err);
					} else {
						resolve(stats.isDirectory());
					}
				})
			}, (res) => {
				console.log('目录不存在');
				reject();
			})
		})
	}
	//判断文件或者文件夹是否存在
	isFileExit(path) {
		return new Promise((resolve, reject) => {
			if(fs.existsSync(path)) {
				resolve();
			} else {
				reject();
			}
		})
	}

	//读取一个目录
	readDir(path) {
		const _this = this,
			fileNum = [];
		return new Promise((resolve, reject) => {
			fs.readdir(path, function(err, files) {
				if(err) {
					reject(err);
//					return console.error(err);
				}
				fileNum.push(path);
				files.forEach((file) => {
					let pageSon = `${path}/${file}`;
					console.log(pageSon);
					_this.isDir(pageSon).then((res) => {
						//判断是不是文件夹
						console.log(res);
						if(res) {
							console.log('我是文件夹');
//							_this.readDir(pageSon).then((res)=>{
//								fileNum.cancat(res);
//							},(res)=>{
//								
//							});
						}else{
							console.log('我是文件')
							fileNum.push(pageSon)
						}
						
					}, (res) => {
						console.error(res);
						reject();
					})
				})
				resolve(fileNum);
			})
		});

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
		const _this = this;
		return new Promise((resolve, reject) => {
			_this.isFileExit(path).then((res) => {
				console.log('文件夹已经存在不可以创建');
			}, (res) => {
				fs.mkdir(path, (err) => {
					if(err) {
						reject(err);
					} else {
						console.log('文件夹创建成功');
						resolve();
					}
				})

			})

		})
	}
	//删除一个文件
	//path删除路径
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
	deleteDir(path) {
		const _this = this;
		return new Promise((resolve, reject) => {
			_this.isDir(path).then((res) => {
				fs.rmdir(path, (err) => {
					if(err) {
						console.error(err);
						reject();
					} else {
						resolve();
					}
				})
			}, (res) => {

			})
		})
	}

	//复制文件 
	//src复制原文件路径 dest 复制到哪里去的路径
	copyFile(src, dest) {
		const _this = this;
		return new Promise((resolve, reject) => {
			_this.isFileExit(dest).then((res) => {
				console.log(`已存在${dest}的文件`)
			}, () => {
				fs.copyFile(src, dest, (err) => {
					if(err) {
						reject(err);
					} else {
						console.log(`${src} was copied to ${dest}`);
						resolve();
					}
				})
			})
		})
	}

	/*  复制一个目录及目录下所有的文件
	 *  src 复制的原文件夹路径
	 * 	dest 复制到哪里去的地址
	 */
	copyDir(src, dest) {
		const _this = this;
		return new Promise((resolve, reject) => {
			_this.isFileExit(src).then((res) => {
				_this.isFileExit(dest).then((res) => {
					console.log(`已存在${dest}的文件夹`);
					reject();

				}, (res) => {
					console.log('进来了吗');
					//读取src目录
					fs.readdir(src, function(err, files) {
						if(err) {
							return console.error(err);
						}
						//先创建根目录dest
						_this.buildDir(dest);
						files.forEach((file) => {
							let pageSon = `${src}/${file}`;
							let copyPageSon = `${dest}/${file}`
							_this.isDir(pageSon).then((res) => {
								//res为true则表示为文件夹,则继续执行此函数进行文件夹复制
								//res为false则表示为文件,就直接复制文件
								if(res) {
									_this.copyDir(pageSon, copyPageSon);
								} else {
									_this.copyFile(pageSon, copyPageSon);
								}
							}, (res) => {
								console.error(res);
							})
						})
					})
				})
			}, (res) => {
				console.log('复制的原文件夹不存在');
				reject();
			})
		})
	}
	//操作EXCEL
}
const FO = new fileOperator();
//FO.isFileExit("input");
//FO.readDir('../遍历');
//FO.buildFile('buildFile.txt', '我是被writeFile写出来的').then((res) => {
//	FO.deleteFile('buildFile.txt');
//})
//
//FO.buildDir("被mkDir创建的文件夹");
//FO.copyFile('index.js','使用copyFile得来的index.js')

//FO.copyDir('../遍历', '../遍历2')
//FO.deleteDir("../遍历2");

FO.readDir('../遍历').then((res)=>{
	console.log("输出结果");
	console.log(res);
})
