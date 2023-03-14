<template>
  <div class="display">
    <h4>用户名：</h4>
    <el-input class="in"
      placeholder="请输入内容"
      v-model="inputUserName"
      clearable>
    </el-input>
    <h4>密码：</h4>
    <el-input class="in"
      placeholder="请输入内容"
      v-model="inputUserPassword"
      clearable>
    </el-input>
    <h4>权限：</h4>
    <el-input class="in"
      placeholder="请输入内容"
      v-model="inputUserPower"
      clearable>
    </el-input>

    <el-row >
      <el-button type="info" @click="insert">信息按钮</el-button>
    </el-row>
    
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name:'InsertUser',
    data(){
      return {
        inputUserName:'123',
        inputUserPassword:'',
        inputUserPower:''
      }
    },
    methods:{
      // 向后端提交数据添加信息
      insert(){
        axios({
          method:'post',
          url:'http://localhost:8080/user/',
          data:{
            username:this.inputUserName, 
            password:this.inputUserPassword, 
            user_power:this.inputUserPower
          }
        })
        // 添加数据后更新数据
        // this.$bus.$on('page', (data1) =>{
        //     console.log("@", data1);
        //     this.pageNum = data1.pageNum;
        //     this.pageSize = data1.pageSize;
        //   })
        setTimeout(() => {
          axios.get("http://localhost:8080/user").then(
            res => {
              this.$bus.$emit('usersInfo', res.data); 
            }
          )
        }, 30);
      },
      
    }

}
</script>

<style>
  .in{
    width: 150px;
  }
  .display{ 
    display: flex;
  }
  h4{
    margin-top: 5px;
    margin-left: 5px;
  }
</style>