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
// 任务管理
export function selectTask(data) {
  return request({
    url: '/task/selectTask',
    method: 'post',
    data
  })
}
// 任务管理-撤销
export function updateStatus(data) {
  return request({
    url: '/task/updateStatus',
    method: 'post',
    data
  })
}
// 任务管理-执行
export function addTasksToWaiting(data) {
  return request({
    url: '/task/addTasksToWaiting',
    method: 'post',
    data
  })
}
// 添加任务
export function addTasks(data) {
  return request({
    url: '/task/addTasks',
    method: 'post',
    data
  })
}
// 添加任务
export function addTask(data) {
  return request({
    url: '/task/addTask',
    method: 'post',
    data
  })
}
// 根据编号查询条数
export function queryCountByUserIdOrGateway(data) {
  return request({
    url: '/task/queryCountByUserIdOrGateway',
    method: 'post',
    data
  })
}
// 明细列表
export function selectTaskDetail(data) {
  return request({
    url: '/task/selectTaskDetail',
    method: 'post',
    data
  })
}
// 明细列表
export function updateStatusDetail(data) {
  return request({
    url: '/task/updateStatusDetail',
    method: 'post',
    data
  })
}
// 一键执行
export function doDetailTask(data) {
  return request({
    url: '/task/doDetailTask',
    method: 'get',
    params: data

  })
}