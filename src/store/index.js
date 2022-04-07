import Vue from 'vue'
import Vuex from 'vuex'
import { login, logout } from "@/api/user"
import { randomNum } from "@/utils";
import { setStorage, getStorage } from "@/utils/auth";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // info: {}
  },
  mutations: {
    // SET_TOKEN(state, token) {
    //   state.token = token
    // },
    // SET_INFO(state, info) {
    //   state.info = info
    // }
  },
  actions: {
    // 账户名称登录
    login({
      commit
    }, userInfo) {
      return new Promise((resolve, reject) => {
        // 请求后台登陆
        // login(userInfo).then(data => {
        //   console.log(data, '----data')
        //   if (data.code === 200) {
        //     const smsToken = 'sms-token' + randomNum()
        //     setStorage('token', smsToken)
        //     resolve()
        //   }


        // }).catch(error => {
        //   reject(error)
        // })
      })
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        // logout().then(data => {
        //   if (data.code === 200) {
        //     setStorage('token')
        //     resolve()
        //   }
        // }).catch(error => {
        //   reject(error)
        // })
      })
    }
  },
  modules: {
  }
})
