<template>
  <div class = container >
    <el-upload  style="margin-top: 5px; margin-left: 5px;"
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
        @click="submitUpload">合并量化数据</el-button>
      <el-button  type="info" @click="exportExcel(year + '年初二一级部' + month +'月份班级量化')" size="small" style="margin-top: 5px;">导出excel</el-button>
      <el-button  type="info" size="small" style="margin-top: 5px; margin-left: 5px;" v-print="'#printTable'">打印</el-button>
      <div style="margin-top:10px; ">只能上传xls/xlsx文件。</div>
    </el-upload>
   
    <h4>
      <i class="el-icon-info"></i>
      以下为合成量化数据，请检查无误后，点击“上传到服务器”按钮上传至服务器。
    </h4>
    <el-table  
        class="print" 
        id="printTable"  
        :data="tempData" 
				ref="report-table"
				border stripe
				:row-style="{height:30+'px'}" 
				:cell-style="{padding:0+'px'}" 
				:header-cell-style="{background:'#F5F7FA',color:'#606266', height:'10px', padding:'0px' }"
				style="width:100%; margin-top: 5px;  margin: 0 auto; ">
			<el-table-column :label="year + '年初二一级部' + month +'月份班级量化'" align="center" style="text" >
				<el-table-column prop="className" label="班级" width="55" align="center" />
				<el-table-column :label="'纪律' + jl + '%'" align="center">
					<el-table-column prop="classDiscipline" label="教室纪律" align="center" />
						<!-- <template slot-scope="scope">可获得每个单元格内容
							<div @click='goclick1(scope.row.class_Discipline)'>{{ scope.row.class_Discipline }}</div>
						</template> -->
					<el-table-column prop="classGrilDiscipline" label="女宿纪律" align="center" />
					<el-table-column prop="classManDiscipline" label="男宿纪律" align="center" />
				</el-table-column>
				<el-table-column :label="'卫生'+ ws + '%'" align="center">
					<el-table-column prop="classHealth" label="教室卫生" align="center" />
					<el-table-column prop="classOcsd" label="卫生区" align="center" />
					<el-table-column prop="classGrilHealth" label="女宿卫生" align="center" />
					<el-table-column prop="classManHealth" label="男宿卫生" align="center" />
				</el-table-column>
				<el-table-column :label="'三操' +sc +'%'" align="center">
					<el-table-column prop="classGrasp" label="三操" align="center" />
				</el-table-column>
				<el-table-column :label="'面貌' + mm + '%'" align="center">
					<el-table-column prop="classSpirit" label="精神面貌" align="center" />
				</el-table-column>
				<el-table-column :label="'班务' + bw + '%'" align="center">
					<el-table-column prop="classTeam" label="班务" align="center" />
				</el-table-column>
				<el-table-column prop="classQuantization" label="行为量化" align="center" />
				<el-table-column prop="classRanking" label="排名" align="center" />
				<el-table-column prop="classTeacher" label="班主任" align="center" />
				<el-table-column prop="classRemark" label="备注" align="center" />
			</el-table-column>
		</el-table>
    
  </div>

</template>

<script>

import FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import axios from 'axios'

import url from "@/api/config"
import { readFile, character1, delay } from '@/api/utils'
import { Message, Loading } from "element-ui";

export default {
  name:"ComposeLh",
  data() {
    return {
      fileList: [],
      tempData: [],
      tableData:[],
      year:0,
      month:0,
      disable: false,
      lh:'量化',
			ctime:'初二一级部1月份',
			jl:40,
			ws:25,
			sc:20,
			mm:20,
			bw:10
    }
  },
  mounted(){
    let data = new Date() //当前日期
    this.year = Number(data.getFullYear());//当前年
    this.month = Number(data.getMonth()) + 1;
    this.getAllComposeInfo();
  },
  methods: {
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
        for (let key in character1) {
          // eslint-disable-next-line no-prototype-builtins
          if (!character1.hasOwnProperty(key)) break;
          let v = character1[key],
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
      this.tableData = arr;
      loadingInstance.close();
      Message({
          message: '文件已选择，请点击合并量化数据按钮进行数据合成。',
          type: 'success',
          showClose: true
        })
    },
    async submitUpload() {

      if (this.tableData.length <= 0) {
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
        if (n > this.tableData.length - 1) {
          complate();
          return;
        }
        let body = this.tableData[n];
        // console.log("===body==", JSON.stringify(this.tempData));
        console.log("===body1==", body);
        this.getAllComposeInfo(body);       
        n++;
        send();
      }
      send();
    },

    //获得合并后的班级量化数据
   async getAllComposeInfo(body){
      console.log(body === undefined);
      if(body === undefined) body = '';
      setTimeout(()=>{
          axios({
          method: 'post',
          url: url.baseUrl+'/classInfo/compose',
          data: {
            className:body.className,
            classDiscipline:body.classDiscipline,
            classGrilDiscipline:body.classGrilDiscipline,
            classManDiscipline:body.classManDiscipline,
            classHealth:body.classHealth,
            classOcsd:body.classOcsd,
            classGrilHealth:body.classGrilHealth,
            classManHealth:body.classManHealth,
            classGrasp:body.classGrasp,
            classSpirit:body.classSpirit,
            classTeam:body.classTeam,
            classQuantization:body.classQuantization,
            classRanking:body.classRanking,
            classTeacher:body.classTeacher
            },
          // contentType:'application/json;charset=UTF-8', //不能加   
          dataType:"JSON",
            //classTypeKey: this.sizeForm.classTypeKey,

          }).then(
            response => {
              if (response.data) {
                console.log("data数据", response.data);
                this.tempData = response.data.data;
              }
            }
          )
        },100)
    },
    
    //导出合并后的班级量化excel
    exportExcel(excelName) {
			try {
				const $e = this.$refs['report-table'].$el
				console.log('@', $e);
				let $table = $e.querySelector('.el-table__fixed')
				if (!$table) {
					$table = $e
				}
				const wb = XLSX.utils.table_to_book($table, { raw: true })
				console.log('@@', wb);
				const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
				console.log('@@@', wbout);
				FileSaver.saveAs(
					new Blob([wbout], { type: 'application/octet-stream' }),
					`${excelName}.xlsx`,
				)
			} catch (e) {
				if (typeof console !== 'undefined') console.error(e)
			}
		}
  }
}
</script>

<style>
.container {
    display: flex;
    min-height: 800px;
    flex-direction: column;
	}
</style>