import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/about',
    component: () => import('../views/About.vue')
  }

]

const router = new VueRouter({
  routes
})


// 挂载路由导航首位
router.beforeEach((to, from, next) => {
  // to将要访问的路径
  // from来自哪个页面
  // next是一个函数，表示放行
  // next() 直接放行 next('/login') 强制跳转
  if (to.path === '/login') return next();
  const tokenStr = window.sessionStorage.getItem('token');
  if (!tokenStr) return next('/login');
  next();

})


export default router