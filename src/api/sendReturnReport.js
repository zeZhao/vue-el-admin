import request from '@/utils/http'
export function queryByPage(data) {
  return request({
    url: '/report/queryByPage',
    method: 'post',
    data
  })
}