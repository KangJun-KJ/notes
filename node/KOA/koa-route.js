const Koa = require('koa');
const route = require('koa-route');
const cors = require('koa-cors');

const app = new Koa();

app.use(cors());

const about = ctx => {
  ctx.response.type = 'html';
  ctx.response.body = '<a href="/">Index Page</a>';
};

const main = ctx => {
  ctx.response.body = 'Hello World';
};

const redirect = ctx => {
	console.log('132');
  ctx.response.redirect('/');
};

app.use(route.get('/', main));
app.use(route.get('/about', about));
app.use(route.get("/redirect", redirect));

app.listen(3000);