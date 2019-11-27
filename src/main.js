import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/global.css'
import {
  Button,
  Form,
  FormItem,
  Input,
  Message
} from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css';

import axios from 'axios'
// 配置请求根路径
axios.defaults.baseURL = 'https://api.coindesk.com/v1/bpi'
Vue.prototype.$http = axios

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
//挂载消息弹框属性
Vue.prototype.$message = Message




Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')