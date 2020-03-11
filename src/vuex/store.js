import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    shoppingCart: JSON.parse(window.sessionStorage.getItem('shoppingCart')) || [],
    userInfo: JSON.parse(window.sessionStorage.getItem('userInfo')),
  },
  mutations: {
    setUserInfo(state, data) {
      state.userInfo = data
      window.sessionStorage.setItem('userInfo', JSON.stringify(data))
    },
    setShoppingCart(state, data) {
      state.shoppingCart = data
      window.sessionStorage.setItem('shoppingCart', JSON.stringify(data))
    }
  }
})

export default store