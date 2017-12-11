<!DOCTYPE html>
<html>

	<head>
		<meta charset="UTF-8">
		<title></title>
		<script src='js/vue2.0.js'></script>
		<script src='js/vue-router.js'></script>
		<style>
			.fade-enter-active,
			.fade-leave-active {
				transition: opacity .5s;
			}
			
			.fade-enter,
			.fade-leave-active {
				opacity: 0;
			}
			
			.fade2-enter-active,
			.fade2-leave-active {
				transition: background .5s ease-in, color .3s ease-in;
			}
			
			.fade2-enter,
			.fade2-leave-active {
				background: #FF6666;
				color: red;
			}
		</style>
	</head>

	<body>
		<div id="app">
      <h1>Transitions</h1>
      <ul>
        <li><router-link to="/">/</router-link></li>
        <li><router-link to="/parent">/parent</router-link></li>
        <li><router-link to="/parent/foo">/parent/foo</router-link></li>
        <li><router-link to="/parent/bar">/parent/bar</router-link></li>
      </ul>
      <transition name="fade" mode="out-in">
        <router-view class="view"></router-view>
      </transition>
    </div>
		<script>
			const Home = {
							template: `
			    <div class="home">
			      <h2>Home</h2>
			      <p>hello</p>
			    </div>
  `
			}

			const Parent = {
				data() {
					return {
						transitionName: 'slide-left'
					}
				},
				// dynamically set transition based on route change
				watch: {
					'$route' (to, from) {
						const toDepth = to.path.split('/').length
						const fromDepth = from.path.split('/').length
						this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
					}
				},
				template: `
    <div class="parent">
      <h2>Parent</h2>
      <transition :name="transitionName">
        <router-view class="child-view"></router-view>
      </transition>
    </div>
  `
			}

			const Default = {
				template: '<div class="default">default</div>'
			}
			const Foo = {
				template: '<div class="foo">foo</div>'
			}
			const Bar = {
				template: '<div class="bar">bar</div>'
			}

			const router = new VueRouter({
				mode: 'history',

				routes: [{
						path: '/',
						component: Home
					},
					{
						path: '/parent',
						component: Parent,
						children: [{
								path: '',
								component: Default
							},
							{
								path: 'foo',
								component: Foo
							},
							{
								path: 'bar',
								component: Bar
							}
						]
					}
				]
			})

			new Vue({
				router
			}).$mount('#app')
		</script>
	</body>

</html>