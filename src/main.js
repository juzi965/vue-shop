import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex/store.js'
import './plugins/element.js'
import './plugins/axios.js'
import Navigation from './components/Navigation'
import Footer from './components/Footer'

Vue.component('Navigation', Navigation)
Vue.component('Footer', Footer)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
