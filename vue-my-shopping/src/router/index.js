import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/',
    redirect: '/login'

  },
  {
    path: '/home',
    component: () => import('../views/home/Home.vue'),
    redirect:'/users',
    children: [{
        path: '/users',
        component: () => import('../views/home/Users.vue')
      },
      {
        path: '/rights',
        component: () => import('../views/home/Right.vue')
      },
      {
        path: '/goods',
        component: () => import('../views/home/Goods.vue')
      },
      {
        path: '/addgoods',
        component: () => import('../views/home/Addgoods.vue')
      },
      {
        path: '/orders',
        component: () => import('../views/home/Orders.vue')
      },
      {
        path: '/reports',
        component: () => import('../views/home/Reports.vue')
      },
      {
        path: '/params',
        component: () => import('../views/home/Params.vue')
      },
      {
        path: '/roles',
        component: () => import('../views/home/Roles.vue')
      },
      {
        path: '/categories',
        component: () => import('../views/home/Categories.vue')
      }
    ]
  }
]


const router = new VueRouter({
  routes
})

// 路由拦截 路由守卫
router.beforeEach((to, from, next) => {
  // 获取token
  const tokenStr = localStorage.getItem('token')
  // 不是登录页还没有token就跳到登录页
  if (to.path !== '/login' && !tokenStr) return next('/login')
  next()
})

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
