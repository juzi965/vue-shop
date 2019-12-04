import Vue from 'vue'
import axios from 'axios'
// 配置请求根路径
axios.defaults.baseURL = 'https://api.coindesk.com/v1/bpi'
// 设置请求token
// axios.interceptors.request.use(config => {
//   config.headers.Authorization = window.sessionStorage.getItem('token')
//   return config
// })
Vue.prototype.$http = axios