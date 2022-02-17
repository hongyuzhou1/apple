let asyncRoutes = [
    {
        // 管理后台的主页面
        path: '/home',
        name: 'layout',
        component: () => import('../views/layout'),
        redirect: '/home/dashboard',
        children: [
            {
                path: 'dashboard',
                name: 'dashboard',
                component: () => import('@/views/dashboard'),
                meta: {
                    title: '首页',
                    icon: "el-icon-eleme"
                }
            }
        ]
    },
    //   图表展示 
      {
        path: '/charts',
        name: 'charts',
        meta: {
            title: '图表展示',
            icon: 'el-icon-location'
        },
        component: () => import('../views/layout'),
        children: [
            {
                path: 'bar',
                name: 'bar',
                component: () => import('@/views/charts/bar.vue'),
                meta: {
                    title: '柱状图',
                    icon: 'el-icon-star-off'
                }
            },
            {
                path: 'pie',
                name: 'pie',
                component: () => import('@/views/charts/pie.vue'),
                meta: {
                    title: '饼图',
                    icon: 'el-icon-star-off'
                }
            }
        ]

    },
    // 学生管理 
    {
        path: '/stuAdmin',
        name: 'stuAdmin',
        meta: {
            title: '学生管理',
            icon: 'el-icon-location'
        },
        component: () => import('../views/layout'),
        children: [
            {
                path: 'addNewStu',
                name: 'addNewStu',
                component: () => import('@/views/stuAdmin/addNewStu.vue'),
                meta: {
                    title: '新生报名',
                    icon: 'el-icon-star-off'
                }
            },
            {
                path: 'adminClass',
                name: 'adminClass',
                component: () => import('@/views/stuAdmin/adminClass.vue'),
                meta: {
                    title: '班级管理',
                    icon: 'el-icon-star-off'
                }
            },
            {
                path: 'stuInfo',
                name: 'stuInfo',
                component: () => import('@/views/stuAdmin/stuInfo.vue'),
                meta: {
                    title: '学生信息',
                    icon: 'el-icon-star-off'
                }
            }
        ]

    },

    //教师管理
    {
        path: '/teacherAdmin',
        name: 'teacherAdmin',
        meta: {
            title: '教师管理1'
        },
        component: () => import('../views/layout'),
        children: [
            {
                path: 'teacherInfo',
                name: 'teacherInfo',
                component: () => import('@/views/teacherAdmin/teacherInfo.vue'),
                meta: {
                    title: '教师信息'
                }
            },
            {
                path: 'teacherHours',
                name: 'teacherHours',
                component: () => import('@/views/teacherAdmin/teacherHours.vue'),
                meta: {
                    title: '课时统计'
                }
            },
            {
                path: 'teacherScore',
                name: 'teacherScore',
                component: () => import('@/views/teacherAdmin/teacherScore.vue'),
                meta: {
                    title: '教评分数'
                }
            }
        ]

    },

    //公告信息
    {
        path: '/notice',
        name: 'notice',
        component: () => import('../views/layout'),
        children: [
            {
                path: 'notice',
                component: () => import('../views/notice'),
                meta: {
                    title: '公告信息'
                }
            }
        ]
    },

    // 就业管理
    {
        path: '/job',
        name: 'job',
        meta: {
            title: '就业管理'
        },
        component: () => import('../views/layout'),
        children: [
            {
                path: 'jobList',
                component: () => import('../views/job/jobList'),
                meta: {
                    title: '职位信息'
                }
            },
            {
                path: 'jobAddress',
                component: () => import('../views/job/jobAddress'),
                meta: {
                    title: '就业地信息'
                }
            }
        ]
    },
]

export default asyncRoutes