import Vue from 'vue'
import VueRouter from 'vue-router'
import asyncRoutes from './asyncRoutes'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/home'
  },
  ...asyncRoutes,
  {
    path:'/login',
    name:'login',
    component:() => import('../views/login'),
    meta:{
      title:'登录'
    }
  },
  {
    path:'/notice',
    name:'notice',
    component:() => import('@/views/layout'),
    children:[
      {
        path:'notice',
        component:() => import('@/views/notice'),
        meta:{
          title:'公告信息'
        }
      }
    ]
  },
  {
    path:'*',
    name:'404',
    component:() => import('../views/404')
  }
]

// 避免路由重复点击出错
const originalPush = VueRouter.prototype.push
 
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next) => {
  document.title = to.meta.title
  let token = sessionStorage.getItem("token")
  if(to.fullPath === '/login'){
    next()
  }else{
    if(token){
      next()
    }else{
      next("/login")
    }
  }
})

export default router
