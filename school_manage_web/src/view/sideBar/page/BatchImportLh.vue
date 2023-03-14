<template>
  <div>
    <div>
      <el-upload 
        class="upload-demo" 
        ref="upload" action
        :on-preview="handlePreview" 
        :on-remove="handleRemove" 
        :file-list="fileList" 
        :on-change="handle"
        :show-file-list="false"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" :disabled="disable"
          @click="submitUpload">上传到服务器</el-button>
        
        <div >只能上传xls/xlsx文件
          <el-button type="text" @click="downModel('量化模板')">下载模板</el-button>
        </div>
      </el-upload>
    </div>
    <div style="margin-top:10px; " v-show="show">
      <h4>
        <i class="el-icon-info"></i>
        以下采集完量化数据，请检查无误后，点击“上传到服务器”按钮上传至服务器。
      </h4>
      <el-table 
        :data="tempData" 
        style="width:100%; 
        margin-top:10px;" 
        :height="height" 
        border
        :cell-style="{ padding: 7 + 'px' }">
        <el-table-column type="index" width="60" label="ID" align="center">
        </el-table-column>
        <el-table-column prop="className" label="班级" width="80" align="center">
        </el-table-column>
        <el-table-column prop="classTeacher" label="班主任" width="100" align="center">
        </el-table-column>
        <el-table-column prop="classType" label="量化类型" width="105" align="center">
        </el-table-column>
        <el-table-column prop="classDetail" label="违纪内容" align="center">
        </el-table-column>
        <el-table-column prop="classPoints" label="扣分" width="70" align="center">
        </el-table-column>
      </el-table>
    </div>
  </div>

</template>

<script>
import { readFile, character, delay } from '@/api/utils'
import { Message, Loading } from "element-ui";
import * as XLSX from 'xlsx'
import axios from 'axios'
import { exportExcelModel } from '@/excel/reportExcel'
import url from "@/api/config"
export default {
  name: 'BatchImportLh',
  data() {
    return {
      fileList: [],
      tempData: [],
      height: 500,
      show: false,
      disable: false
    }
  },
  methods: {
    handleRemove(file, fileList) {
      this.tempData = [];
      this.show = false;
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    //采集文件
    async handle(ev) {
      let file = ev.raw;
      if (!file) return;
      this.show = false;

      let loadingInstance = Loading.service({
        text: "loading....",
      });
      await delay(100);
      //读取file中的数据(变为json格式)
      let data = await readFile(file);
      let workbook = XLSX.read(data, { type: 'binary' }),
        worksheet = workbook.Sheets[workbook.SheetNames[0]];
      data = XLSX.utils.sheet_to_json(worksheet)

      //把读取出来的数据变为最后可以传递给服务器的数据
      let arr = [];
      data.forEach(item => {
        let obj = {};
        for (let key in character) {
          // eslint-disable-next-line no-prototype-builtins
          if (!character.hasOwnProperty(key)) break;
          let v = character[key],
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
      this.tempData = arr;
      this.show = true;
      loadingInstance.close();
    },
    async submitUpload() {

      if (this.tempData.length <= 0) {
        Message({
          message: '请选择EXCEL文件再上传',
          type: 'warning',
          showClose: true
        })
        return;
      }

      this.disable = true;
      let loadingInstance = Loading.service({
        text: "loading....",
      });
      await delay(100);
      //完成后做的事情
      let complate = (n) => {
        Message({
          message: '共上传成功'+ n + '条量化数据，上传失败' + n1 + '条量化数据。',
          type: 'success',
          showClose: true
        })
        this.show = false;
        this.disable = false;
        loadingInstance.close();
      }
      //一条一条传给服务器
   
      let n = 0, n1 = 0;
      let send = async () => {
        if (n > this.tempData.length - 1) {
          complate(n);
          return;
        }
        let body = this.tempData[n];
        console.log("###", body);
        
          axios({
            method: 'post',
            url: url.baseUrl + '/classInfo/',
            data: {
              className: body.className,
              classType: body.classType,
              classDetail: body.classDetail,
              classPoints: body.classPoints,
              classTeacher: body.classTeacher,
              //classTypeKey: this.sizeForm.classTypeKey,
              classDate: new Date()
            }
          }).then(
            response => {
              if (response.data) {

                console.log(response.data);
              } else {
                n1++;
              }
            }
          )
        
        console.log("n的值", n);
        n++;
        send();
      }
      send();

    },
    //下载模板
    async downModel(titleName){
      const data = [{
        // className: "1班", classTeacher: "张三", classType: "教室卫生",
        // classDetail: "地面不干净", classPoints: 2
      }]
      exportExcelModel(titleName, data);
    }
  }
}
</script>

<style>

</style>