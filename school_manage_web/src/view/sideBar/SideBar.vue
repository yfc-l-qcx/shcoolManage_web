<template>
  <div style="height: 100%;">
    <!-- 侧栏 -->
    <el-container style="height: 100%;">
      <el-aside :width="sideWidth + 'px'" style="background-color: rgb(238, 241, 246); height: 100%;" >
        <el-menu :default-openeds="['1', '3']" 
                  style="height: 100%;  overflow-x: hidden"
                  background-color="rgb(48, 65, 86)"
                  text-color="#fff"
                  active-text-color="#ffd04b"
                  :collapse-transition="true"
                  :collapse="isCollapse"
                  router
                  :unique-opened="true"
                  @select="handleOpen"
        >
          <div style="height: 60px; line-height: 60px; text-align: center">
            <img src="../../assets/logo.png" alt="" style="width: 20px; position: relative; top: 5px; margin-right: 5px">
            <b style="color: white" v-show="logoTextShow">后台管理系统</b>
          </div>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message"></i>
              <span slot="title" >量化</span>
            </template>
           
            <el-submenu style="margin-left:20px">
              <span  slot="title">班级量化</span>
              <el-menu-item index="/mainpage"  >班级排名</el-menu-item>
              <el-menu-item index="/showLhdetails" >班级明细</el-menu-item>
              <el-menu-item index="/composelh" >班级量化合成</el-menu-item>
            </el-submenu>
        
         
            <el-submenu style="margin-left:20px">
              <span slot="title">学科组量化</span>
              <el-menu-item index="/subjectrank" >学科组排名</el-menu-item>
            </el-submenu>
          
            

          </el-submenu>
          
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">教师信息管理</span>
            </template>
            
            <el-submenu style="margin-left:20px">
              <span slot="title">教师信息管理</span>
              <el-menu-item index="/teacherinfo">教师基本信息</el-menu-item>
            </el-submenu>
  
          </el-submenu>
        </el-menu>
      </el-aside>
      
      <!-- 顶部 -->
      <el-container>
        <el-header style="font-size: 12px; 
                          border-bottom: 1px solid #ccc; 
                          line-height: 60px; 
                          display: flex;">
          <div style="flex: 1; font-size: 20px" >
            <span :class="collapseBtnlClass" style="cursor: pointer" @click="collapse"></span>
          </div>
          <el-dropdown  style="width: 70px; cursor: pointer;" >
            <span>王小虎</span>
            <i class="el-icon-arrow-down" style="margin-left: 5px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          
        </el-header>
     
        <!-- 内容 -->
        <!-- router跳转组件 -->
          <router-view></router-view>
      </el-container>
    </el-container>
  </div>
</template>

<script>

export default {
  name:'SideBar',
  mounted(){
    console.log("执行了");
  },
  data(){
    return {
      collapseBtnlClass:'el-icon-s-fold',
      isCollapse:false,
      sideWidth:200,
      logoTextShow:true
    }
  },
  methods:{
    collapse(){ //点击收缩按钮
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse) {
        this.sideWidth = 64;
        this.collapseBtnlClass = 'el-icon-s-unfold';
        this.logoTextShow = false;
      }else{
        this.sideWidth = 200
        this.collapseBtnlClass = 'el-icon-s-fold';
        this.logoTextShow = true;
      }
      
    },
    handleOpen(key, path){
      console.log("====key==",key, path);
    }
  }
}
</script>

<style>
  
  .el-aside {
    color: #333;
  }
</style>