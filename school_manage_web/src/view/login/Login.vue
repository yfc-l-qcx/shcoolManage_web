<template>
  <div>
   <el-card class="login-form-layout">
     <el-form autoComplete="on"
              :model="loginForm"
              :rules="loginRules"
              ref="loginForm"
              label-position="left">
       <div style="text-align: center">
         <svg-icon icon-class="login-mall" style="width: 56px;height: 56px;color: #409EFF" ></svg-icon>
       </div>
       <h2 class="login-title color-main">school-manage</h2>
       <el-form-item prop="username">
         <el-input name="username"
                   type="text"
                   v-model="loginForm.username"
                   autoComplete="on"
                   placeholder="请输入用户名">
           <span slot="prefix">
             <svg-icon icon-class="user" class="color-main"></svg-icon>
           </span>
         </el-input>
       </el-form-item>
       <el-form-item prop="password">
         <el-input name="password"
                   :type="pwdType"
                   @keyup.enter.native="handleLogin"
                   v-model="loginForm.password"
                   autoComplete="on"
                   placeholder="请输入密码">
           <span slot="prefix">
             <svg-icon icon-class="password" class="color-main"></svg-icon>
           </span>
           <span slot="suffix" @click="showPwd">
             <svg-icon icon-class="eye" class="color-main"></svg-icon>
           </span>
         </el-input>
       </el-form-item>
       <el-form-item style="margin-bottom: 60px;text-align: center">
         <el-button style="width: 45%" type="primary" :loading="loading" @click.native.prevent="handleLogin">
           登录
         </el-button>
         <el-button style="width: 45%" type="primary" @click.native.prevent="handleTry">
           注册
         </el-button>
       </el-form-item>
     </el-form>
   </el-card>
    <img :src="login_center_bg" class="login-center-layout">
  </div>
</template>

<script>

import {isvalidUsername} from "@/utils/validate";
import login_center_bg from '@/assets/images/login_center_bg.png'
import { setCookie } from '@/utils/support'
export default {
	// eslint-disable-next-line vue/multi-word-component-names
	name:'Login',
	data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error('密码不能小于3位'))
      } else {
        callback();
      }
    }
		return {
      loginForm: {
        username: '',
        password: '',
      },
      //对用户名和密码进行校验
      loginRules: {
        username: [{required: true, trigger: 'blur', validator: validateUsername}],
        password: [{required: true, trigger: 'blur', validator: validatePass}]
      },
      loading: false,
      pwdType: 'password',
      login_center_bg,
		}
	},
	mounted(){

	},
	methods:{
    //是否显示密码
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate( valid => {
        if (valid) {
          console.log("===校验通过===")
          this.loading = true;
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false;
            setCookie("username", this.loginForm.username, 15);
            setCookie("password", this.loginForm.password, 15);

            console.log("跳转页面之前")
            this.$router.push({path: '/'});
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log("参数验证不合法");
          return false
        }
      })
    },
    handleTry() {
      console.log("====注册====")
    }
  },

}
</script>

<style scoped>
  .login-form-layout {
    position: absolute;
    left: 0;
    right: 0;
    width: 360px;
    margin: 140px auto;
    border-top: 10px solid #409EFF;
  }

  .login-title {
    text-align: center;
  }
  /*.color-main {*/
  /*  color: #409EFF;*/
  /*}*/

  .login-center-layout {
    background: #409EFF;
    width: 100%;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    margin-top: 200px;
  }

</style>