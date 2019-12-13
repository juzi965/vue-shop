import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import store from './vuex/store'
import './plugins/element.js'
import './plugins/axios'
import './assets/css/global.css'
import Navigation from './components/Navigation'
import Footer from './components/Footer'



Vue.use(Vuex)

Vue.component('Navigation', Navigation)
Vue.component('Footer', Footer)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')