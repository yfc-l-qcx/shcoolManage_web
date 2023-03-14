<template>
  <el-form ref="ruleForm" :model="sizeForm" :rules="rules" label-width="auto" class="demo-ruleForm">
    <el-form-item :inline="true" label="班级名称" class="demo-form-inline" prop="className" label-width="100px">
      <el-col :span="18">
        <el-select v-model="sizeForm.className" placeholder="请选择活动区域" :multiple="true">
          <el-option v-for="allClass in classList" :key="allClass.id" :label="allClass.className" :value="allClass.className">
          </el-option>
        </el-select>
      </el-col>
    </el-form-item>
    <el-form-item label="班主任"  label-width="100px">
      <el-col :span="18">
        <el-input 
        placeholder="自动输入 " 
        v-model="sizeForm.classTeacher" 
        :disabled="true">
        </el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="量化类型" prop="classTypeKey" label-width="100px">
      <el-col :span="18">
        <el-select v-model="sizeForm.classTypeKey" placeholder="请选择活动区域">
          <el-option v-for="types in typeList" :key="types.id" :label="types.classTypeValue" :value="types.classTypeKey">
          </el-option>
        </el-select>
      </el-col>
    </el-form-item>
    <el-form-item label="违纪内容" prop="classDetail" label-width="100px">
      <el-col :span="18">
        <el-input v-model="sizeForm.classDetail" placeholder="填入违纪内容" />
      </el-col>
    </el-form-item>
    <el-form-item label="所扣分数" prop="classPoints" label-width="100px">
      <el-col :span="18">
        <el-input v-model="sizeForm.classPoints" placeholder="填入所扣分数" />
      </el-col>
    </el-form-item>
    <el-form-item label="违纪日期" prop="classPoints" label-width="100px">
      <el-col :span="18">
        <el-date-picker v-model="wjDate" type="datetime" placeholder="选择日期时间" > </el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item size="large" >
      <center>
        <el-button type="info" @click="submitForm('ruleForm')" >提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </center>
    </el-form-item>
  </el-form> 
</template>

<script>
import axios from 'axios';

import url from '@/api/config'
// import * as XLSX from 'xlsx'
// import FileSaver from 'file-saver'
export default {
  name:'AddClassDetails',
  mounted(){
    this.getAllIteam();
    
  },
  data(){
    return {
      classList:[],
      typeList:[],
      wjDate:new Date(),
      sizeForm:{
        className:'',
        classTypeKey:'',
        classDetail:'',
        classPoints:'',
        classTeacher:''
      },
      rules:{
        className: [
          { required: true, message: '请选择班级名称', trigger: ['blur','change'] }
        ],
        classTypeKey: [
          { required: true, message: '请选择量化类型', trigger: 'change' }
        ],
        classDetail: [
          { required: true, message: '请输入违纪内容', trigger: 'blur' }
        ],
        classPoints: [
          { required: true, message: '请输入所扣分数', trigger: 'blur' }
        ]
      }
    }
  },
  watch:{
    "sizeForm.className"(){
      this.sizeForm.classTeacher = '';
      // console.log("@@@111", this.classList, this.typeList);
      //let s1 = this.classList.map(item => item.className)
      
      //自动输入相应班主任名字
      let s2 = this.classList.map(item => item.classTeacher)
      this.sizeForm.classTeacher = s2[this.sizeForm.className[0] - 1];
      for(let i = 1; i < this.sizeForm.className.length; i++) {
        this.sizeForm.classTeacher += ',' +  s2[i] ;
      }

      // this.sizeForm.className.forEach(element => {
      //   this.sizeForm.classTeacher += ',' +  s2[element - 1] ;
      // });
      console.log("====this.sizeForm.classTeacher===", this.sizeForm.classTeacher);
      // let index = s1.indexOf(this.sizeForm.className)
    }
  },
  methods:{
    async submitForm(formName) {
      console.log("formName==", formName);
      let t1 = this.typeList.map(item => item.classTypeKey)
      let t2 = this.typeList.map(item => item.classTypeValue)
      let indexTpem = t1.indexOf(this.sizeForm.classTypeKey)
      let classType = t2[indexTpem]
      this.sizeForm.className = this.sizeForm.className.join(",");

      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios({
            method: 'post',
            url: url.baseUrl + '/classInfo/',
            data: {
              className: this.sizeForm.className,
              classType: classType,
              classDetail: this.sizeForm.classDetail,
              classPoints: this.sizeForm.classPoints,
              classTeacher: this.sizeForm.classTeacher,
              classTypeKey: this.sizeForm.classTypeKey,
              classDate:this.wjDate
            }
          }).then(
            response=> {
              console.log("==response===", response.data);
              if(response.data === 1){
                alert('添加成功!');
              }
            }
          )    
          
          this.resetForm('ruleForm');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.wjDate = new Date();
    },
    // 获得所有班级和量化类型
    getAllIteam(){
      console.log("==========");
      
      this.fullscreenLoading = true;
      axios.get(url.baseUrl + "/classInfo/allItem").then(
        response => {
          console.log('@', response.data);
          this.typeList = response.data.typeList;
          this.classList = response.data.classList;
          this.$bus.$emit('list', this.typeList, this.classList);
        }
      )
      
      this.fullscreenLoading = false;
    },
    // export2Excel() {
    //   require.ensure([], () => {
    //     const { export_json_to_excel } = require('@/excel/Export2Excel');
    //     const t = ['班级量化'];
    //     const tHeader = ['班级', '教室纪律', '女宿纪律', '男宿纪律', '教室卫生',
    //       '卫生区', '女宿卫生', '男宿卫生', '三操', '精神面貌', '班务', '行为量化',
    //       '排名', '班主任', '备注'
    //     ];
    //     const filterVal = ['className', 'classDiscipline', 'classGrilDiscipline',
    //       'classManDiscipline', 'classHealth', 'classOcsd', 'classGrilHealth',
    //       'classManHealth', 'classGrasp', 'classSpirit', 'classTeam', 'classQuantization',
    //       'classRanking', 'classTeacher', 'classRemark'
    //     ];
    //       axios.get("http://localhost:8080/classInfo").then(
    //         response => {
    //           const list = response.data.data;
    //           console.log('@', response.data);
    //           const data = this.formatJson(filterVal, list);
    //           export_json_to_excel(t, tHeader, data, '班级量化');
    //         }
    //       )
    //   })
    // },
    //将数组处理成索引数组
    // formatJson(filterVal, jsonData) {
    //   console.log("%%", jsonData);
    //   return jsonData.map(v => filterVal.map(j => v[j]))
    // },
    
  },
  
}
</script>

<style>

</style>