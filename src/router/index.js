import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: () => import('../views/Index.vue'),
    redirect: '/welcome',
    children: [{
        path: '/welcome',
        component: () => import('../views/Welcome.vue')
      },
      {
        path: '/my-account',
        redirect: '/user-info',
        component: () => import('../views/MyAccount.vue'),
        children: [{
            path: '/user-info',
            component: () => import('../views/UserInfo.vue')
          },
          {
            path: '/order-info',
            component: () => import('../views/OrderInfo.vue')
          },
          {
            path: '/address-info',
            component: () => import('../views/AddressInfo.vue')
          },
          {
            path: '/change-password',
            component: () => import('../views/ChangePassword.vue')
          }
        ]
      },
      {
        path: '/shop/:name',
        component: () => import('../views/Shop.vue')
      },
      {
        path: '/shopping-cart',
        component: () => import('../views/ShoppingCart.vue')
      },
      {
        path: '/fitting-room',
        component: () => import('../views/FittingRoom.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

// 挂载路由导航首位
router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    next('/index')
  } else {
    next()
  }
})

export default router