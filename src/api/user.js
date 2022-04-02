import request from '@/utils/http'

export function login(data) {
  return request({
    url: '/login/login',
    method: 'post',
    data
  })
}
export function logout(data) {
  return request({
    url: '/login/logout',
    method: 'post',
    data
  })
}