<template>
  <div ref="print">

    <el-row :gutter="20" style="margin-left:5px; margin-right:5px" class="no-print">
      <el-select size="small" v-model="form.schoolList.schoolArea" placeholder="请选择校区" style="margin: 5px;">
        <el-option v-for="allSchool in form.schoolList" :key="allSchool.id" :label="allSchool.schoolArea" :value="allSchool.schoolArea">
        </el-option>
      </el-select>
    
      <el-select size="small" v-model="form.gradeList.gradeName" placeholder="请选择年级" style="margin: 5px;">
        <el-option v-for="allGrade in form.gradeList" :key="allGrade.id" :label="allGrade.gradeName" :value="allGrade.gradeName">
        </el-option>
      </el-select>

      <el-select size="small" v-model="form.deptList.deptName" placeholder="请选择级部" style="margin: 5px;">
        <el-option v-for="allDept in form.deptList" :key="allDept.id" :label="allDept.deptName" :value="allDept.deptName">
        </el-option>
      </el-select>

      <el-select size="small" v-model="form.classList.className" placeholder="请选择班级" style="margin: 5px;">
        <el-option  v-for="allClass in form.classList" :key="allClass.id" :label="allClass.className" :value="allClass.className">
        </el-option>
      </el-select>

      <el-autocomplete 
        size="small"
        class="inline-input"
        v-model="form.teacherName"
        style="margin: 5px;"
        :fetch-suggestions="querySearch"
        placeholder="请输入教师姓名"
        @select="handleSelect"
      />

      <!-- <el-input size="small" v-model="form.name" placeholder="请输入姓名" /> -->
      <el-button type="info" size="small" style="margin-top: 5px; margin-left: 5px;" @click="selectTeacherInfo()">查询</el-button>
      <el-button type="info" size="small" style="margin-top: 5px; margin-left: 5px;" @click="printTeacherInfo()">打印</el-button>

      <el-button type="info" size="small" style="margin-top: 5px; margin-left: 5px;" @click="onExport()" id="onExport">导出图片</el-button>
      <el-upload  style="margin-top: 5px; margin-left: 5px; margin-bottom: 5px;"
        class="upload-demo" 
        ref="upload" action
        :on-preview="handlePreview" 
        :on-remove="handleRemove" 
        :file-list="fileList" 
        :on-change="handle"
        :show-file-list="false"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">导入教师信息</el-button>
      </el-upload>
      
    </el-row>
  
    <hr >
    <!-- 表格 -->
    <div ref="imageWrapper">
      <el-table 
      :data="tableData" 
      ref="report-table"
      border stripe
     
      :row-style="{height:30+'px'}" 
      :cell-style="{padding:0+'px'}" 
      :header-cell-style="{background:'#F5F7FA',color:'#606266', height:'10px', padding:'0px'}"
      style=" width: 100%; margin-top: 5px;" >
        <el-table-column type="index" label="ID" width="50" align="center"/>
        <el-table-column prop="teacherName" label="姓名" width="100" align="center" />
        <el-table-column prop="schoolArea" label="校区" width="150" align="center" />
        <el-table-column prop="gradeName" label="年级" width="90" align="center" />
        <el-table-column prop="deptName" label="级部" width="90" align="center" />
        <el-table-column prop="className" label="班级" width="90" align="center" />
        <el-table-column prop="subjectName" label="学科" width="90" align="center" />
        <el-table-column prop="telName" label="电话" width="180" align="center" />
        <el-table-column prop="IdCard" label="身份证号" width="230" align="center" />
        <el-table-column prop="address" label="住址"   align="center" />
		</el-table>
    </div>
    
    <!-- 分页 -->
    <el-pagination
      style="margin-top: 5px;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSize"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="count">
    </el-pagination>
  </div>
  
</template>

<script>

import * as XLSX from 'xlsx'
import axios from 'axios';

import { readFile, character2, delay } from '@/api/utils'
import { Message, Loading } from "element-ui";

import html2canvas from 'html2canvas';
import url from '@/api/config'
export default {
  name:"TeacherInfo",
  data(){
    return {
      tempData:[],
      tableData:[],
      form:{
        schoolList:[
          { id:"1", schoolArea:"滨湖新区校区" },
          { id:"2", schoolArea:"安平校区" },
          { id:"3", schoolArea:"清河校区" },
          { id:"4", schoolArea:"保定校区" }
        ],
        gradeList:[
          {id:"1", gradeName:"初一"},
          {id:"2", gradeName:"初二"},
          {id:"3", gradeName:"初三"}
        ],
        deptList:[
          {id:"1", deptName:"1级部"},
          {id:"2", deptName:"2级部"},
          {id:"3", deptName:"3级部"},
        ],
        classList:[
          {id:"1", className:"1班"},
          {id:"2", className:"2班"},
          {id:"3", className:"3班"},
        ],
        teacherName:''
      }, 
      currentPage: 1,
      count:100,
      pageSize:[2, 3, 20, 25],
      pages:2,
      pageNum:1,

      fileList: [],
    }
  },
  mounted() {
    this.selectTeacherInfo();
      this.restaurants = this.loadAll();
    },
  methods:{
    // 教师选择功能
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    handleSelect(item) {
      console.log(item);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    // 教师姓名选择数据
    loadAll() {
      return [
        { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
        { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
        { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
        { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
        { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
        { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
        { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
        { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
      ];
    },
    // 提交查询条件
    selectTeacherInfo(){
      setTimeout(()=>{
      if(this.form.classList.className === undefined) this.form.classList.className = null;
      if(this.form.schoolList.schoolArea === undefined) this.form.schoolList.schoolArea = null;
      if(this.form.deptList.deptName === undefined) this.form.deptList.deptName = null;
      if(this.form.gradeList.gradeName === undefined) this.form.gradeList.gradeName = null;
      if(this.form.teacherName === "") this.form.teacherName = null;
        axios({
        method: 'post',
        url: url.baseUrl + '/teacherInfo?pageSize='+this.pages+'&pageNum='+this.pageNum,
        data: {
          className: this.form.classList.className,
          schoolArea: this.form.schoolList.schoolArea,
          deptName: this.form.deptList.deptName,
          gradeName: this.form.gradeList.gradeName,
          teacherName: this.form.teacherName
         
        },
        
        }).then(
          response => {
            if (response.data) {
              console.log("++++data数据++++", response.data);
              this.tableData = response.data.data;
              console.log("count===", response.data.count);
              this.count = response.data.count;
            }
          }
        )
      },100)

    },
    // 打印教师信息表
    printTeacherInfo(){
      console.log("+++++导入教师信息+++++");
      // 打印内容
      this.$print(this.$refs.print);
    },
    // 分页功能
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pages = val;
      this.selectTeacherInfo();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.selectTeacherInfo();
    },

    handleRemove(file, fileList) {
      this.tempData = [];
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    //采集文件
    async handle(ev) {
      let file = ev.raw;
  
      if (!file) return;

      let loadingInstance = Loading.service({
        text: "loading....",
      });
      await delay(100);
      //读取file中的数据(变为json格式)
      let data = await readFile(file);

      let workbook = XLSX.read(data, { type: 'binary' }),
        worksheet = workbook.Sheets[workbook.SheetNames[0]];
      data = XLSX.utils.sheet_to_json(worksheet)
      console.log("==data==", data);
      //把读取出来的数据变为最后可以传递给服务器的数据
      let arr = [];
      data.forEach(item => {
        let obj = {};
        for (let key in character2) {
          // eslint-disable-next-line no-prototype-builtins
          if (!character2.hasOwnProperty(key)) break;
          let v = character2[key],
            text = v.text,
            type = v.type;
          v = item[text] || "";
          type === "string" ? (v = String(v)) : null;
          type === "number" ? (v = Number(v)) : null;
          obj[key] = v;
        }
        arr.push(obj);
      });
      await delay(100);
      //内容展示在页面
      
      //this.tempData = arr;
      this.tempData = arr;
      console.log("+++++", this.tempData);
      loadingInstance.close();

      if (this.tempData.length <= 0) {
        Message({
          message: '请选择EXCEL文件再上传',
          type: 'warning',
          showClose: true
        })
        return;
      }

      this.disable = true;
      loadingInstance = Loading.service({
        text: "loading....",
      });
      await delay(100);
      //完成后做的事情
      let complate = () => {
        Message({
          message: '上传成功！！',
          type: 'success',
          showClose: true
        })
        this.disable = false;
        loadingInstance.close();
      }
      //用递归一条一条传给服务器
      let n = 0;
      let send = async () => {
        if (n > this.tempData.length - 1) {
          complate();
          return;
        }
        let body = this.tempData[n];
        // console.log("===body==", JSON.stringify(this.tempData));
        console.log("===body1==", body);

        this.getAllComposeInfo(body);
        
        n++;
        send();
      }
      send();

      Message({
          message: '教师信息已上传。',
          type: 'success',
          showClose: true
        })
    },

    //获得导入教师信息每条数据
    async getAllComposeInfo(body){
    console.log(body === undefined);
    if(body === undefined) body = '';
    setTimeout(()=>{
        axios({
        method: 'get',
        url: 'http://localhost:8080/classInfo/teacherInfo',
        data: {
          
        },
        dataType:"JSON",
        }).then(
          response => {
            if (response.data) {
              console.log("data数据", response.data);
              this.tableData = response.data.data;
            }
          }
        )
      },100)
    },

    //导出为图片
    onExport() {
        const clientWidth = this.$refs.imageWrapper.offsetWidth;
      const clientHeight = this.$refs.imageWrapper.offsetHeight;
      const kh = [clientWidth, clientHeight];

      html2canvas(this.$refs.imageWrapper, { useCORS: true, logging: true, backgroundColor : "#F5F7FA" }).then((canvas) => {
        
        const dataURL = canvas.toDataURL('image/png');
        this.download(dataURL, kh);
      });
    },
     getUrlBase64(url, kh) {
      return new Promise((resolve) => {
        let canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.crossOrigin = 'Anonymous'; // 允许跨域
        img.src = url;
        img.onload = () => {
          // eslint-disable-next-line prefer-destructuring
          canvas.height = kh[1];
          // eslint-disable-next-line prefer-destructuring
          canvas.width = kh[0];
          ctx.drawImage(img, 0, 0, kh[0], kh[1]);
          const dataURL = canvas.toDataURL('image/png');
          canvas = null;
          resolve(dataURL);
        };
      });
    },
    download(imgUrl, kh) {
      this.getUrlBase64(imgUrl, kh).then((base64) => {
        const link = document.createElement('a');
        link.href = base64;
        // link.download = `${this.currentRobot.nickname}名片.png`;
        link.download = `班级量化.png`;
        link.click();
      });
    },
  },
  
}
</script>

<style>

</style>