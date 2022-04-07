import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from "@/views/layout";
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
    path: '/dataExport',
    component: Layout,
    // redirect:'/dataExport',
    children: [
      {
        path: '/dataExport',
        name: 'dataExport',
        component: () => import(/* webpackChunkName: "about" */  '@/views/dataExport/index.vue'),
        meta: {
          title: '数据导出'
        }
      }
    ]
  },
  {
    path: '/downloadCenter',
    component: Layout,
    // redirect:'/dataExport',
    children: [
      {
        path: '/downloadCenter',
        name: 'downloadCenter',
        component: () => import(/* webpackChunkName: "about" */ '../views/downloadCenter/index.vue'),
        meta: {
          title: '下载中心'
        }
      }
    ]
  },
  {
    path: '/sendReturnReport',
    component: Layout,
    // redirect:'/dataExport',
    children: [
      {
        path: '/sendReturnReport',
        name: 'sendReturnReport',
        component: () => import(/* webpackChunkName: "about" */ '../views/sendReturnReport/index.vue'),
        meta: {
          title: '发送返回报告'
        }
      }
    ]
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
      next({
        path: '/login'
      });
    }
  }
})


export default router
