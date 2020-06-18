import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from './router'
// 引入element-UI
import ElementUI, { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
 
// 引入第三方插件
import TreeTable from 'vue-table-with-tree-grid'

Vue.use(ElementUI)


// 引入路由
import axios from 'axios'
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://www.klxin.cn:8888/api/private/v1/'

// 请求拦截
axios.interceptors.request.use(config => {
  // 获取token
  const tokenStr = localStorage.getItem('token')
  if(tokenStr) config.headers.Authorization = tokenStr
  return config
},err => {
  return Promise.reject(err)
})

// 响应拦截
axios.interceptors.response.use(res=> {
  // 分两步，第一是请求没有成功
  if (res.status !== 200) {
    return Message.error('网络异常')
  } else {
   // 第二是请求成功，但是没有得到需要的结果
    const val = res.data.meta.status !== 200 && res.data.meta.status !== 201 && res.data.meta.status !== 204
  if(val) return Message.error(res.data.meta.msg || '请求失败') 
  }
  return res
},err => {
  return Promise.reject(err)
})

Vue.component('tree-table',TreeTable)

Vue.config.productionTip = false

new Vue({
  router,
  axios,
  render: h => h(App)
}).$mount('#app')
