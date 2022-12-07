import request from '@/utils/http'

export function queryByPage(data) {
  return request({
    url: '/bootList',
    method: 'post',
    data
  })
}
//xinzeng
export function insertBoot(data) {
  return request({
    url: '/insertBoot',
    method: 'post',
    data
  })
}
//xinzeng
export function update(data) {
  return request({
    url: '/update',
    method: 'post',
    data
  })
}
//xinzeng
export function deteleBoot(data) {
  return request({
    url: '/deleteBoot',
    method: 'post',
    data
  })
}
//xinzeng
export function upload(data) {
  return request({
    url: '/upload',
    method: 'post',
    data,
    
  })
}
