import request from '@/utils/http'

//验证口令
export function checkPassphrase(data = '') {
  return request({
    url: `/export/checkPassphrase${data}`,
    method: 'get',
  })
}
//导出
export function submitDownloadCenter(data) {
  return request({
    url: '/export/submitDownloadCenter',
    method: 'post',
    data
  })
}
//类别分页查询
export function sortQueryByPage(data) {
  return request({
    url: '/sort/queryByPage',
    method: 'post',
    data
  })
}
//新增类别
export function addSave(data) {
  return request({
    url: '/sort/save',
    method: 'post',
    data
  })
}
//修改类别
export function updateSort(data) {
  return request({
    url: '/sort/update',
    method: 'post',
    data
  })
}
//删除类别
export function deleteSort(data) {
  return request({
    url: `/sort/delete?id=${data}`,
    method: 'delete',
  })
}
//状态码描述/错误解释分页查询
export function explainQueryByPage(data) {
  return request({
    url: '/statusDescribe/queryByPage',
    method: 'post',
    data
  })
}
//新增错误解释
export function addExplain(data) {
  return request({
    url: '/statusDescribe/save',
    method: 'post',
    data
  })
}
//修改错误解释
export function updateExplain(data) {
  return request({
    url: '/statusDescribe/update',
    method: 'post',
    data
  })
}
//删除错误解释
export function deleteExplain(data) {
  return request({
    url: `/statusDescribe/delete?id=${data}`,
    method: 'delete',
    
  })
}
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