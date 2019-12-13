import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    cardNum: window.sessionStorage.getItem('cardNum')
  },
  mutations: {
    addCardNum(state, num) {
      state.cardNum = num
      window.sessionStorage.setItem('cardNum', num)

    }
  }
})

export default store