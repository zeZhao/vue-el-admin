import request from '@/utils/http'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}
export function logout() {
  return request({
    url: '/user/logout',
    method: 'get',
  })
}