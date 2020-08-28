import Vue from 'vue'
import App from './App'
import store from './store'
Vue.prototype.$api = 'http://118.25.222.68:5757/heyushuo'
Vue.prototype.$store = store
Vue.config.productionTip = false

App.mpType = 'app'
import uView from "uview-ui";
Vue.use(uView);
const app = new Vue({
	...App,
  store
})
app.$mount()
