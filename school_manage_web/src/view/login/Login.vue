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
     </el-form>
   </el-card>
  </div>
</template>

<script>

import {isvalidUsername} from "@/utils/validate";

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
      loginRules: {
        username: [{required: true, trigger: 'blur', validator: validateUsername}],
        password: [{required: true, trigger: 'blur', validator: validatePass}]
      }
		}
	},
	mounted(){

	},
	methods:{

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
</style>