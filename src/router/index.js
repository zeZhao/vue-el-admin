import Vue from 'vue'
import VueRouter from 'vue-router'
import { setStorage, getStorage } from "@/utils/auth";

Vue.use(VueRouter)

export const constantRoutes = [
  {
    path: "/login",
    name: 'login',
    hidden: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */  '@/views/login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/aloneExport',
    name: 'aloneExport',
    component: () => import(/* webpackChunkName: "about" */  '@/views/aloneExport/index.vue'),
    meta: {
      title: '单条导出'
    }
  },
  {
    path: '/summarizExport',
    name: 'summarizExport',
    component: () => import(/* webpackChunkName: "about" */  '@/views/summarizExport/index.vue'),
    meta: {
      title: '汇总导出'
    }
  },
  {
    path: '/gmxData',
    name: 'gmxData',
    component: () => import(/* webpackChunkName: "about" */  '@/views/gmxData/index.vue'),
    meta: {
      title: '国美信数据'
    }
  },
  {
    path: '/jxtData',
    name: 'jxtData',
    component: () => import(/* webpackChunkName: "about" */  '@/views/jxtData/index.vue'),
    meta: {
      title: '交信投数据'
    }
  },
  {
    path: '/sxxhData',
    name: 'sxxhData',
    component: () => import(/* webpackChunkName: "about" */  '@/views/sxxhData/index.vue'),
    meta: {
      title: '圣熙新华数据'
    }
  },
  {
    path: '/yhthcData',
    name: 'yhthcData',
    component: () => import(/* webpackChunkName: "about" */  '@/views/yhthcData/index.vue'),
    meta: {
      title: '粤海天河城'
    }
  },
  {
    path: '/bajData',
    name: 'bajData',
    component: () => import(/* webpackChunkName: "about" */  '@/views/bajData/index.vue'),
    meta: {
      title: '百安居'
    }
  },
  {
    path: '/downloadCenter',
    name: 'downloadCenter',
    component: () => import(/* webpackChunkName: "about" */ '../views/downloadCenter/index.vue'),
    meta: {
      title: '下载中心'
    }
  },
  {
    path: '/sendReturnReport',
    name: 'sendReturnReport',
    component: () => import(/* webpackChunkName: "about" */ '../views/sendReturnReport/index.vue'),
    meta: {
      title: '发送记录'
    }
  },
  {
    path: '/utilityClass',
    name: 'utilityClass',
    component: () => import(/* webpackChunkName: "about" */ '../views/utilityClass/index.vue'),
    meta: {
      title: '工具类'
    }
  },
]

const router = new VueRouter({
  routes: constantRoutes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.name == 'login') {
    next();
  } else {
    console.log()
    let token = getStorage('token');
    if (token) {
      next();
    } else {
      next()
      // next({
      //   path: '/login'
      // });
    }
  }
})


export default router
