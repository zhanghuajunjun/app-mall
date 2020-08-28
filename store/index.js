import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
      index: '',
      cartCounts: 0
    },
    mutations:{
      setIndex(state,data){
        state.index = data
      },
      setCartCounts(state,data){
        state.cartCounts = data
      }
    },
    
})
export default store