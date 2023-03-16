import { login } from '@/api/login'
import {  setToken, removeToken} from "@/utils/auth";


const user = {
  action: {
    //登录
    Login({ commit }, userInfo) {
      console.log("===登录userInfo====", userInfo)
      const username = userInfo.username.trim()

      return new Promise((resolve, reject) => {

        login(username, userInfo.password).then(response => {
          const data = response.data
          const tokenStr = data.tokenHead+data.token
          console.log("===tokenStr===", tokenStr)
          setToken(tokenStr)

          commit('SET_TOKEN', tokenStr)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    //前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user