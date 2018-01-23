import routesLoader from '../utils/routesLoader'

export default function(app) {
	routesLoader(`${__dirname}`).then(routers => {
		routers.forEach(router => {
			app
				.use(router.routes())
				.use(router.allowedMethods({
					throw: true
				}))
		})
	})
}