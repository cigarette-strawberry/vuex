import Vue from 'vue'
// import Vuex from 'vuex'
import Vuex from './myvuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  getters: {
    // 理解成 vuex的计算属性即可
    countType(state) {
      return state.count % 2 ? '奇数' : '偶数'
    }
  },
  mutations: {
    //mutations中的方法是用来改变state中的数据的；

    //在mutations中的函数的第一个参数 都是state
    // 第二个参数 是通过commit  执行的时候传进来的参数
    // 这里的函数最多只有两参数
    changeCount(state, params) {
      state.count = params
    }
  },
  actions: {
    // 在action中的函数 的第一个参数 都是  store(new 出来vuex实例)
    // 第二个参数 是通过dispatch执行这个函数的时候传进来的参数；
    // 最多只有两个参数；
    changeCountFn(store, params) {
      setTimeout(() => {
        store.commit('changeCount', params)
      }, 2000)
    }
  }
})
