import Vue from 'vue'
import VueRouter from 'vue-router'
import Cookies from 'vue-cookies'
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path:'/login',
    name:'login',
    component:()=>import('@/views/login.vue')
  },
  {
    path:'/home',
    name:'home',
    component:()=>import('@/views/home.vue'),
    children:[
      {
        path:'class',
        component:()=>import('@/views/class/class.vue')
      },
      {
        path:'main',
        component:()=>import('@/views/main/main.vue')
      },
      {
        path:'student',
        component:()=>import('@/views/student/student.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
const whitePage=['/login','/register']
router.beforeEach((to,from,next)=>{
  if(!Cookies.isKey('token')&&!whitePage.includes(to.path)){
    next('/login')
  }else{
    next()
  }
})
export default router
