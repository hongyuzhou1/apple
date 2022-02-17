import { createNamespacedHelpers } from 'vuex'

let asyncRoutes = [
  {
    path:'/home',
    name:"layout",
    component: () => import('@/views/layout'),
    redirect:'/home/dashboard',
    children:[
      {
        path:'dashboard',
        name:'dashboard',
        component:() => import('@/views/dashboard'),
        meta:{
          title:'首页',
          icon:'el-icon-monitor'
        }
      }
    ]
  },
    // 学生管理
  {
    path:'/stdAdmin',
    name:'stdAdmin',
    meta:{
      title:'学生管理',
      icon:'el-icon-location'
    },
    component:() => import('@/views/layout'),
    children:[
      {
        path:'stuInfo',
        name:'stuInfo',
        component:() => import('@/views/stdAdmin/stuInfo'),
        meta:{
          title:'学生信息',
          icon:'el-icon-bangzhu'
        }
      },
      {
        path:'adminClass',
        name:'adminClass',
        component:() => import('@/views/stdAdmin/adminClass'),
        meta:{
          title:'管理班级',
          icon:'el-icon-user'
        }
      },
      {
        path:'addNewStu',
        name:'addNewStu',
        component:() => import('@/views/stdAdmin/addNewStu'),
        meta:{
          icon:'el-icon-circle-plus-outline',
          title:'添加学生'
        }
      }
    ]
  },
  // 教师管理
  {
    path:'/teacherAdmin',
    name:'teacherAdmin',
    meta:{
      title:'教师管理',
      icon:'el-icon-location'
    },
    component:() => import('@/views/layout'),
    children:[
      {
        path:'teacherInfo',
        name:'teacherInfo',
        component:() => import('@/views/teacherAdmin/teacherInfo'),
        meta:{
          title:'教师信息',
          icon:'el-icon-circle-plus-outline'
        }
      },
      {
        path:'teacherHours',
        name:'teacherHours',
        component:() => import('@/views/teacherAdmin/teacherHours'),
        meta:{
          title:'课时统计',
          icon:'el-icon-bangzhu'
        }
      },
      {
        path:'teacherScore',
        name:'teacherScore',
        component:() => import('@/views/teacherAdmin/teacherScore'),
        meta:{
          title:'教评分数',
          icon:'el-icon-user'
        }
      }
    ]
  },
  {
    path:'/upload',
    name:'upload',
    meta:{
      title:'图片上传'
    },
    component:() => import('@/views/layout'),
    children:[
      {
        path:'upload',
        component:() => import('@/views/upload/index.vue'),
        meta:{
          title:'上传图片',
          icon:'el-icon-location'
        }
      }
    ]
  }
]

export default asyncRoutes