import request from '@/utils/http'

export function memberList(data) {
  return request({
    url: '/memberList',
    method: 'post',
    data
  })
}
//xinzeng
export function insertMember(data) {
  return request({
    url: '/insertMember',
    method: 'post',
    data
  })
}
//xinzeng
export function updateMember(data) {
  return request({
    url: '/updateMember',
    method: 'post',
    data
  })
}
//xinzeng
export function deleteMember(data) {
  return request({
    url: '/deleteMember',
    method: 'post',
    data
  })
}