var http = require('http'),
	httpProxy = require('http-proxy');

// 新建一个代理 Proxy Server 对象  
var proxy = httpProxy.createProxyServer({});

// 捕获异常  
proxy.on('error', function(err, req, res) {
	res.writeHead(500, {
		'Content-Type': 'text/plain'
	});
	res.end('Something went wrong. And we are reporting a custom error message.');
});

// 另外新建一个 HTTP 80 端口的服务器，也就是常规 Node 创建 HTTP 服务器的方法。  
// 在每次请求中，调用 proxy.web(req, res config) 方法进行请求分发  
var server = require('http').createServer(function(req, res) {
	// 在这里可以自定义你的路由分发  
	var host = req.headers.host,
		ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	console.log("client ip:" + ip + ", host:" + host);

	switch(host) {
		case '47.97.166.74:443/':
			proxy.web(req, res, {
				target: 'localhost:8888'
			}, ssl: {
				key: fs.readFileSync('214466102890795.pem', 'utf8'),
				cert: fs.readFileSync('214466102890795.pem', 'utf8')
			});
			break;
		default:
			res.writeHead(200, {
				'Content-Type': 'text/plain'
			});
			res.end('Welcome to my server!');
	}
});

console.log("listening on port 433")
server.listen(443);