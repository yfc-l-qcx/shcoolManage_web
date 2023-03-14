<template>
  <div > 
    <el-date-picker 
      v-model="value1" 
      size="small"
      format="yyyy-MM-dd"
      value-format="yyyy-MM-dd "
      type="daterange" 
      :picker-options="pickerOptions" 
      range-separator="至"
      start-placeholder="开始日期" end-placeholder="结束日期" 
      style="margin-bottom:5px; margin-right: 5px;"
      align="left">
    </el-date-picker>

    <el-select size="small" v-model="form.className" placeholder="请选择班级" style="margin-right: 5px;">
      <el-option v-for="allClass in classList" :key="allClass.id" :label="allClass.className" :value="allClass.className">
      </el-option>
    </el-select>
  
    <el-select size="small" v-model="form.classType" placeholder="请选择量化类型">
      <el-option v-for="types in typeList" :key="types.id" :label="types.classTypeValue" :value="types.classTypeValue">
      </el-option>
    </el-select>

    <el-button size="small" type="info" style="margin-top: 5px; margin-left: 5px;" @click="selectClassLhInfo">查询</el-button>
    <el-button size="small" type="info" @click="exportExcel('量化')" style="margin-top: 5px;">导出excel</el-button>

    <el-table class="print"
      :data="tableData" 
      height="750px"
      border stripe
      ref="report-table"
      style="width: 100%; height: 100%;" 
      :cell-style="{padding:0+'px'}"
      :row-style="{height:30+'px'}"  >
      <el-table-column type="index" label="ID" width="50" align="center"/>
      <el-table-column prop="className" label="班级" width="80"  sortable align="center"/>
      <el-table-column prop="classTeacher" label="班主任" width="100" sortable align="center"/>
      <el-table-column prop="classType" label="量化类型" width="105"  sortable align="center"/>
      <el-table-column prop="classDetail" label="违纪内容"   align="center"/>
      <el-table-column prop="classPoints" label="扣分" width="50"  align="center"/>
      <el-table-column prop="classDated" label="上传时间" width="140" sortable align="center"/>
      <el-table-column fixed="right" label="图片" width="80" align="center">
        <template slot-scope="scope1">
          <el-button v-if="scope1.row.isImage === true" @click.native.prevent="showImage(scope1.$index)" type="text" size="small">图片</el-button>
          <el-dialog
          title="显示图片"
          :visible.sync="imagePath.show"
          width="50%"
          :destroy-on-close="true"
          :before-close="handleClose">
          <img :imagePath="imagePath" width="100%" :src="require('@/assets/lhImage/' + imageName)"/>
          </el-dialog>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="80" align="center">
        <template slot-scope="scope">
          <el-button @click.native.prevent="deleteRow(scope.$index)" type="text" size="small" :disabled="scope.row.idd" >
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    
  </div>
</template>

<script>
import axios from 'axios';
import { formatDate } from "@/common/date.js";
import { export2Excel } from "@/excel/reportExcel";
import url from '@/api/config'
import { Loading } from "element-ui";

export default {
  name:'ShowLhDetails',
  data(){
    return{
      form:{
        className: '',
        classType: '',
      },
      imageName:'551d5b4c102b4739bf6e426ab5ef4848.jpg',
      imagePath:{
        show:false
      },
      classList:[],
      typeList:[],
      tableData: [],
      value1: [new Date(new Date().toLocaleDateString()), new Date()],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
    }
  },
  mounted(){

    this.selectClassLhInfo();
    this.getAllIteam();
    
  },
  methods:{
    // 打开el-dialog ，展示图片
    showImage(index){
      this.imagePath.show = true;
      this.imageName = this.tableData[index].classImagePath;
    },

    // 获得查询到的量化明细
    selectClassLhInfo(){
      let loadingInstance = Loading.service({
        text: "loading....",
      });
      axios.get(url.baseUrl + "/classInfo/showDetails?startTime="
        + this.getDate(this.value1[0]) + "&endTime=" + this.getDate(this.value1[1]) + 
        "&className=" + this.form.className + "&classType=" + this.form.classType).then(
          response=>{
            this.tableData = response.data.data;
            console.log("=====tableData=====", this.tableData);

            this.tableData.forEach(element => {
              if (element.classImagePath !== null){
                this.imageName = element.classImagePath;
              }
              //不是当天添加的量化无法删除
              if (element.classDated === this.getDate(new Date())){
                // this.showButton = true
                element.idd = false;
              } else {
                // this.showButton = false
                element.idd = true;
              }
              //判断是否有图片
              if(element.classImagePath !== null) {
                element.isImage = true;
              } else {
                element.isImage = false;
              }
            });
        }
      )
      loadingInstance.close();
      this.$set(this.form,'className', '');
      this.$set(this.form,'classType', '');
    },
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd');

    },

    //转换时间方法
    getDate(date) {
      //date是传过来的时间戳，注意需为13位，10位需*1000
      //也可以不传,获取的就是当前时间
      var time = new Date(date);
      var year = time.getFullYear()  //年
      var month = ("0" + (time.getMonth() + 1)).slice(-2); //月
      var day = ("0" + time.getDate()).slice(-2); //日
      // var hours = ("0" + time.getHours()).slice(-2); 
      // var minutes = ("0" + time.getMinutes()).slice(-2); 
      // var seconds = ("0" + time.getSeconds()).slice(-2); 
      var mydate = year + "-" + month + "-" + day ;
      return mydate
    },

    // 获得班级和量化类型数据
    getAllIteam() {
      let loadingInstance = Loading.service({
        text: "loading....",
      });
      axios.get(url.baseUrl + "/classInfo/allItem").then(
        response => {
          this.typeList = response.data.typeList;
          this.classList = response.data.classList;
        }
      )
      loadingInstance.close();
    },
    //导出excel
    exportExcel(titleName) {
      export2Excel(titleName, this.tableData);
      // setExlStyle(this.tableData)
    },
    // 将数组处理成索引数组
    // formatJson(filterVal, jsonData) {
    //   return jsonData.map(v => filterVal.map(j => v[j]))
    // },

    // 删除量化数据
    deleteRow(index, rows) {
      rows = this.tableData;
      axios({
        method: 'delete',
        url: url.baseUrl + '/classInfo/delete/',
        data: {
          id: rows[index].id,
          className: rows[index].className,
          classPoints: rows[index].classPoints,
          classType: rows[index].classType,

        }
      })
      rows.splice(index, 1);
    },

    // 是否关闭窗口
    handleClose(done) {
      // eslint-disable-next-line no-unused-vars
      this.$confirm('确认关闭？').then(_ => {
        done();
        // eslint-disable-next-line no-unused-vars
      }).catch(_ => { });
    },
    // getAllLhDetails(){
    //   axios.post("http://localhost:8080/classInfo/showDetails?startTime="
    //     + new Date().toLocaleDateString()) + "&endTime=" + row.className)
    // }
  }
}
</script>

<style scoped>
::v-deep .el-range-separator{
    padding:0px;
  }
::v-deep .el-input {
    width: 150px;
  }
::v-deep .el-range-input{
    width:100px;
  }
::v-deep .el-date-editor{
    width:290px;
  }
  #main {
    width: 500px;
    height: 500px;
  }

  .container {
    display: flex;

    flex-direction: column;
	}
</style>