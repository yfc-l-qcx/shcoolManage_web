import VueRouter from 'vue-router';
import MainPage from "../view/sideBar/page/MainPage";
import ShowLhDetails from "../view/sideBar/page/ShowLhDetails";
import ComposeLh from "../view/sideBar/page/ComposeLh"
import TeacherInfo from "../view/sideBar/page/teacher/TeacherInfo"
import SubjectRank from "../view/sideBar/page/subjectLh/SubjectRank"
import Login from "@/view/login/Login.vue";
import SideBar from "@/view/sideBar/SideBar.vue";
import Layout from "@/view/layout/Layout.vue";



// 通过vue.use(插件)，安装插件
console.log("执行了router");

// 创建路由对象
const routers = [
  {
    path: '/login',
    component: Login,
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: '/mainpage',
    childern: [{
      path: '/mainpage',
      name: 'mainpage',
      meta: {title: '首页', icon: 'home'}
    }]

  },
  {
    path: '/layout',
    component: Layout,

  },
  // {
  //   path: '/',
  //   redirect:'/login'
  // },
  {
    path: '/login',
    component: Login
  },{
    path:'/mainpage',
    component: MainPage
   
  },{
    path: '/showLhdetails',
    component: ShowLhDetails
  },{
    path: '/composelh',
    component: ComposeLh
  },{
    path: '/teacherinfo',
    component: TeacherInfo
  },{
    path: '/subjectrank',
    component: SubjectRank
  }
]

export default new VueRouter({
  // 配置URL和组价直接的映射关系
  mode: "history",
  routes: routers
 // mode:history
})

