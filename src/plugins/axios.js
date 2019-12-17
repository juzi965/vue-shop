import Vue from 'vue'
import axios from 'axios'
// 配置请求根路径
axios.defaults.baseURL = 'http://localhost:8888/api'
axios.defaults.headers.common['token'] = '123456'
// 设置请求token
// axios.interceptors.request.use(config => {
//   config.headers.Authorization = window.sessionStorage.getItem('token')
//   return config
// })
Vue.prototype.$http = axios