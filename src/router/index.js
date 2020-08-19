import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
    hidden: true,
    meta: {
      title: '',
      icon: '',
    }
  },

  {
    path: '/login',
    name: 'Login',
    component: Login,
    hidden: false,
    meta: {
      title: '登陆',
      icon: 'el-icon-setting',
    },
    children: [
      {
        path: '/child',
        name: 'child',
        hidden: false,
        meta:{
          title:'子菜单',
          icon:''
        }
      }
    ]
  },

  {
    path: '/home',
    name: 'Home',
    hidden: false,
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '主页',
      icon: 'el-icon-s-home',
    },
    children: [
      {
        path: '/child',
        name: 'child',
        hidden: false,
        meta:{
          title:'子菜单',
          icon:''
        },
        children: [
          {
            path: '/child',
            name: 'child',
            hidden: false,
            meta:{
              title:'子菜单',
              icon:''
            }
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  routes
})


// 挂载路由守卫实现没有登陆无法访问页面
router.beforeEach((to, from, next) => {
  // 如果访问的是用户登录页，直接放行
  if (to.path === '/login') return next();
  // 如果访问的不是用户登录页，先判断 token 值
  const token = window.sessionStorage.getItem('token')
  // 如果没有token，强制跳转登陆页
  if (!token) {
    return next('/login')
  }
  return next()
})
export default router
