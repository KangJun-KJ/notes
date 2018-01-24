var http = require('http'),
	httpProxy = require('http-proxy');

httpProxy.createServer({
	ssl: {
		key: fs.readFileSync('214466102890795.pem', 'utf8'),
		cert: fs.readFileSync('214466102890795.pem', 'utf8')
	},
	target: 'https://localhost:8888',
	secure: true // Depends on your needs, could be false.
}).listen(443);

