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
        component: () => import('../views/Welcome.vue'),
        meta: {
          title: '首页'
        }
      },
      {
        path: '/my-account',
        redirect: '/user-info',
        component: () => import('../views/MyAccount.vue'),
        children: [{
            path: '/user-info',
            component: () => import('../views/UserInfo.vue'),
            meta: {
              title: '个人信息'
            }
          },
          {
            path: '/order-info',
            component: () => import('../views/OrderInfo.vue'),
            meta: {
              title: '订单信息'
            }
          },
          {
            path: '/address-info',
            component: () => import('../views/AddressInfo.vue'),
            meta: {
              title: '收货地址'
            }
          },
          {
            path: '/change-password',
            component: () => import('../views/ChangePassword.vue'),
            meta: {
              title: '修改密码'
            }
          }
        ]
      },
      {
        path: '/shop/:name',
        component: () => import('../views/Shop.vue'),
        meta: {
          title: '商城'
        }
      },
      {
        path: '/shopping-cart',
        component: () => import('../views/ShoppingCart.vue'),
        meta: {
          title: '购物车'
        }
      },
      {
        path: '/fitting-room',
        component: () => import('../views/FittingRoom.vue'),
        meta: {
          title: '商品详情'
        }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue'),
    meta: {
      title: '登录'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

// 挂载路由导航首位
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.matched.length === 0) {
    next('/index')
  } else {
    next()
  }
})

export default router