<template>
  <div id="app">
<!--    <side-bar></side-bar>-->
    <router-view></router-view>
  </div>
</template>

<script>

import Login from './view/login/Login.vue'
import InsertUser from './view/login/InsertUser.vue'
import SideBar from "./view/sideBar/SideBar.vue";
export default {
  name: 'App',
  components:{
    // eslint-disable-next-line vue/no-unused-components
  Login, InsertUser, SideBar
  }
}
</script>

<style>
 #app{
  height: 100vh;
 }
 body {
   margin: 0;
 }
 .print {
		height: calc(100% - 40px);
		overflow-y: auto;
	}
</style>
