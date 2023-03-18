import { login } from '@/api/login'
import { getToken, setToken, removeToken} from "@/utils/auth";


const user = {
  //用来存储变量
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

    //提交更新数据的方法，必须是同步的
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },
  //可以包含任何异步操作
  actions: {
    //登录
    Login({ commit }, userInfo) {
      console.log("===登录userInfo====", userInfo)
      const username = userInfo.username.trim()

      return new Promise((resolve, reject) => {
        //向后台传递数据
        login(username, userInfo.password).then(response => {
          const data = response.data
          console.log("===data===", data)
          const tokenStr = data.tokenHead+data.token
          console.log("===tokenStr===", tokenStr)
          setToken(tokenStr)

          commit('SET_TOKEN', tokenStr)
          resolve()
        }).catch(error => {
          console.log("没有登录成功")
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