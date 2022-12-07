import request from '@/utils/http'

export function ConservatorList(data) {
  return request({
    url: '/ConservatorList',
    method: 'post',
    data
  })
}
//xinzeng
export function ConservatorInsert(data) {
  return request({
    url: '/ConservatorInsert',
    method: 'post',
    data
  })
}
//xinzeng
export function updateConservator(data) {
  return request({
    url: '/updateConservator',
    method: 'post',
    data
  })
}
//xinzeng
export function deleteConservator(data) {
  return request({
    url: '/deleteConservator',
    method: 'post',
    data
  })
}