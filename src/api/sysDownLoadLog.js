import request from '@/utils/http'

export function download(data) {
  return request({
    url: '/downloadCenter/download',
    method: 'get',
    responseType: "blob",
    params: data
  })
}
export function queryByPage(data) {
  return request({
    url: '/downloadCenter/queryByPage',
    method: 'post',
    data
  })
}
//取消
export function cancelDownload(data) {
  return request({
    url: '/downloadCenter/cancelDownload',
    method: 'post',
    data
  })
}
//发送
export function sendMailAndSms(data) {
  return request({
    url: '/export/sendMailAndSms',
    method: 'post',
    data
  })
}
//发送
export function deleteDownload(data) {
  return request({
    url: `/downloadCenter/delete?id=${data}`,
    method: 'delete',
  })
}
//查看密码
export function queryPassword(data) {
  return request({
    url: `/downloadCenter/queryPassword?id=${data}`,
    method: 'get',
  })
}