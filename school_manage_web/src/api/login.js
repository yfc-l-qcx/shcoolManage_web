import request from '@/utils/request'

export function login(username, password) {
  return request({
    url:'/admin/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

//获取用户信息
export function getInfo() {
  return request({
    url: '/admin/info',
    method: 'get'
  })
}

//登出
export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}