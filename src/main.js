// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import routerConfig from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import filters from './filter/index.js'
import Qs from 'qs'
import util from './assets/js/util.js'

Vue.use(VueRouter)
Vue.use(VueAxios, axios)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
// axios.defaults.baseURL = 'http://192.168.0.100:9001'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (typeof config.data !== 'string') {
    config.data = Qs.stringify(config.data)
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  if (error.message === 'Network Error') {
    error.message = '网络错误，请检查网络链接是否正常'
  }
  if (error.code === 'ECONNABORTED') {
    error.message = 'timeout: 连接超时'
  }
  // 对响应错误做点什么
  return Promise.reject(error)
})

var router = new VueRouter(routerConfig)

router.beforeEach((to, from, next) => {
  //
  next()
})

router.afterEach((route) => {
  route.meta.title && util.changeTitle(route.meta.title)
  // ...
})

Vue.config.productionTip = false

new Vue({
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app')

/*
axios instancd:

request: function
delete: function
get: function
head: function
post: function
put: function
patch: function
defaults: object
interceptors: object
Axios: function
create: function
Cancel: function
CancelToken: function
isCancel: function
all: function
spread: function
default: function
*/
