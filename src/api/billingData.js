import request from '@/utils/http'

//获取账单数据
export function selectDate(data) {
  return request({
    url: '/changeDate/selectDate',
    method: 'post',
    data
  })
}
//获取月份
export function getMonth(data) {
  return request({
    url: '/changeDate/getMonth',
    method: 'post',
    data
  })
}
//解锁月份
export function updateMonthLock(data) {
  return request({
    url: '/changeDate/updateMonthLock',
    method: 'post',
    data
  })
}
//获取所有解锁月份
export function getMonthUnLock(data) {
  return request({
    url: '/changeDate/getMonthUnLock',
    method: 'post',
    data
  })
}
//账单数据统计
export function selectDateAmount(data) {
  return request({
    url: '/changeDate/selectDateAmount',
    method: 'post',
    data
  })
}