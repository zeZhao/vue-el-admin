import request from '@/utils/http'
export function queryByPage(data) {
  return request({
    url: '/emailSendLog/queryByPage',
    method: 'post',
    data
  })
}