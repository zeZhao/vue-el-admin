import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from "@/layout/index.vue";
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
    path: "/book",
    component: Layout,
    children: [
      {
        path: '/book',
        name: 'book',
        component: () => import(/* webpackChunkName: "about" */ '../views/book/index.vue'),
        meta: {
          title: '书籍管理',
        }
      },
      // {
      //   path: '/bookDistribution',
      //   name: 'bookDistribution',
      //   component: () => import(/* webpackChunkName: "about" */ '../views/bookDistribution/index.vue'),
      //   meta: {
      //     title: '图书分布'
      //   }
      // },
      {
        path: '/teacher',
        name: 'teacher',
        component: () => import(/* webpackChunkName: "about" */ '../views/teacher/index.vue'),
        meta: {
          title: '老师管理'
        }
      },
      {
        path: '/member',
        name: 'member',
        component: () => import(/* webpackChunkName: "about" */ '../views/member/index.vue'),
        meta: {
          title: '会员管理'
        }
      },
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
    let token = getStorage('token');
    if (token) {
      next();
    } else {
      // next()
      next({
        path: '/login'
      });
    }
  }
})


export default router
