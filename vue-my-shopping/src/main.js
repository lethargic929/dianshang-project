import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from './router'
// 引入element-UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

// 引入路由
import axios from 'axios'
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://www.klxin.cn:8888/api/private/v1/'

Vue.config.productionTip = false
new Vue({
  router,
  axios,
  render: h => h(App)
}).$mount('#app')
