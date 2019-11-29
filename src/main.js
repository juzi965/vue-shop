import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './plugins/axios'
import './assets/css/global.css'
import Navigation from './components/Navigation'





Vue.component('Navigation', Navigation)


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')