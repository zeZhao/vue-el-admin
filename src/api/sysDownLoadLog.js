import request from '@/utils/http'

export function download(data) {
  return request({
    url: '/sysDownLoadLog/download',
    method: 'get',
    responseType: "blob",
    params: data
  })
}
export function queryByPage(data) {
  return request({
    url: '/sysDownLoadLog/queryByPage',
    method: 'post',
    data
  })
}
export function cancelDownload(data) {
  return request({
    url: '/sysDownLoadLog/cancelDownload',
    method: 'post',
    data
  })
}