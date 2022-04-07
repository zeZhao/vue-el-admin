import request from '@/utils/http'

export function checkParamOrGetAuthorizationCode(data) {
  return request({
    url: '/export/checkParamOrGetAuthorizationCode',
    method: 'post',
    data
  })
}
export function confirmExport(data) {
  return request({
    url: '/export/confirmExport',
    method: 'post',
    data
  })
}
export function exportData(data) {
  return request({
    url: '/export/exportData',
    method: 'post',
    data
  })
}