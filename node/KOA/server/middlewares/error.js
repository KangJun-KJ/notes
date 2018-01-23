export default async function(ctx, next) {
	try {
		await next();
	} catch(err) {
		ctx.response.status = err.statusCode || err.status || 500;
		ctx.response.body = {
			success:false,
			message: err.message
		};
	}
};