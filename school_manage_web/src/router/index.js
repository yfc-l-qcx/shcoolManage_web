import VueRouter from 'vue-router';
import MainPage from "../view/sideBar/page/MainPage";
import ShowLhDetails from "../view/sideBar/page/ShowLhDetails";
import ComposeLh from "../view/sideBar/page/ComposeLh"
import TeacherInfo from "../view/sideBar/page/teacher/TeacherInfo"
import SubjectRank from "../view/sideBar/page/subjectLh/SubjectRank"



// 通过vue.use(插件)，安装插件
console.log("执行了router");

// 创建路由对象
const routers = [
  {
    path: '/',
    redirect:'/mainpage'
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

