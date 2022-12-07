import axios from "axios";
import { Message } from 'element-ui'
import { setStorage, getStorage } from "@/utils/auth";
import store from '@/store/index.js';
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  retry: 5,
  // withCredentials: true,
})

service.interceptors.request.use(
  config => {
    config.headers['token'] = getStorage('token')
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 500) {
      Message({
        message: res.msg || res.data || '系统异常，请联系管理员',
        type: 'error',
      })
    } else if (res.code === 401) {
      setStorage("token")
      Message({
        message: '登录过期，请重新登录！',
        type: 'error',
      })
      setTimeout(() => window.location.reload(), 2000);
    }
    return res
  },
  error => {
    Message({
      message: '系统异常，请联系管理员',
      type: 'error',
    })
    return Promise.reject(error)
  }
)

export default service