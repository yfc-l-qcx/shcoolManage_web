<template>

	<div class = container ref="print" >
		<el-row  class="no-print">
			<el-button size="small" type="info" @click="exportExcel(ctime + '班级量化（' + startEndTime + '）')" style="margin-top: 5px;">导出excel</el-button>
			
			<el-button size="small" type="info" class="buttontop" @click="addDetails = true">添加量化</el-button>
			<el-dialog 
				title="添加" 
				:visible.sync="addDetails" 
				width="30%" 
				:destroy-on-close="true"
				:before-close="handleClose">
				<add-class-details />
			</el-dialog>

			<el-button size="small" type="info" class="buttontop"  @click="bathcImport = true">批量添加量化</el-button>
			<el-dialog 
				title="批量添加" 
				:visible.sync="bathcImport" 
				width="60%" 
				top="20px"
				:destroy-on-close="true"
				:before-close="handleClose">
				<batch-import-lh />
			</el-dialog>
			
			<el-button size="small" type="info" class="buttontop" @click="showDetails = true">量化明细</el-button>
			<el-dialog 
				title="量化明细" 
				:visible.sync="showDetails" 
				width="1100px" 
				top="20px"
				:destroy-on-close="true"
				:before-close="handleClose">
				<show-lh-details />
			</el-dialog>

			<!-- <el-button type="info" size="small" style="margin-top: 5px; margin-left: 5px;" @click="printTeacherInfo()">打印</el-button> -->
			<el-button  type="info" size="small" style="margin-top: 5px; margin-bottom: 5px; margin-left: 5px;" v-print="'#printTable'">打印</el-button>
			
		</el-row>
		<!-- :row-style="{height:20+'px'}" // 更改表格内容每一行的样式，注意直接写0px或'0px'没有效果
		:cell-style="{padding:0+'px'}" /</el-dialog>/ 更改表格内容每一单元格样式，注意直接写0px或'0px'没有效果
		// 更改表头每一单元格样式，此处可以直接写'0px'
		:header-cell-style="{background:'#F5F7FA',color:'#606266', height:'10px', padding:'0px'}" -->
		<!-- @cell-click="goclick" 可点击每个单元格 -->
		<el-table 
				:data="tableData"  
				id="printTable" 
				class="print"
				ref="report-table"
				border stripe
		
				:row-style="{height:30+'px'}" 
				:cell-style="{padding:0+'px'}" 
				:header-cell-style="{background:'#F5F7FA',color:'#606266', height:'10px', padding:'0px'}"
				style="width:100%; margin-top: 5px; margin: 0 auto; ">
			<el-table-column :label="ctime + '班级量化（' + startEndTime + '）'" align="center" >
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
import * as XLSX from 'xlsx'
import FileSaver from 'file-saver'
import axios from 'axios'

import  startEndDate  from "@/api/utils/dateUtils";
import url from "@/api/config"
import AddClassDetails from "./AddClassDetails.vue";
import BatchImportLh from './BatchImportLh.vue';
import ShowLhDetails from './ShowLhDetails.vue';


export default {
	name:'MainPage',
	beforeDestroy(){
		console.log("组件即将销毁");
	},
	components: { AddClassDetails, BatchImportLh, ShowLhDetails },
	data(){
    return {
			addDetails: false,
			bathcImport: false,
			showDetails: false,
      composeLh: false,
      tableData:[],
			typeList:[],
			classList:[],
			lh:'量化',
			ctime:'初二一级部',
			jl:40,
			ws:25,
			sc:20,
			mm:20,
			bw:10,
			startEndTime:0,
			printTable:{
				id:"printTable",
				popTitle:'班级量化',
				extraCss: 'https://www.google.com,https://www.google.com',
              extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>'
			}
    }
	},

	mounted(){
		// 监听浏览器窗口变化，动态计算表格高度，
		// 109是表格外其它布局占的高度，这个数值根据自己实际情况修改
		// window.addEventListener('resize', () =>{
		// 	this.tableHeight = window.innerHeight - 109;
		// })
		
		//获得当前本周开始和结束日期
		this.startEndTime = startEndDate();
		console.log("-=-=-", this.startEndTime);
		// let arr = startend.split(',');
		// this.startTime = arr[0];
		// this.endTime = arr[1];

		console.log("挂在完毕");
		this.getSelectAllInfo();
		this.$bus.$emit('datas', this.tableData)
	},
	methods:{
		//获得各班级总量化表
		getSelectAllInfo(){
			axios.get(url.baseUrl + "/classInfo").then(
				response =>{
					this.tableData = response.data.data;
				}
			)
		},
		beforOpen(e){
			console.log("打开量化", e);
		},
		//关闭弹窗并且刷新页面量化数据
		handleClose(done) {
			// eslint-disable-next-line no-unused-vars
			this.$confirm('确认关闭？').then(_ => {
				this.getSelectAllInfo();
				done();
				// eslint-disable-next-line no-unused-vars
			}).catch(_ => { });
		},
		//导出excel
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
		},
		// 打印教师信息表
		printTeacherInfo(){
      console.log("+++++导入教师信息+++++");
      // 打印内容
      this.$print(this.$refs.print);
    },
		// goclick(row, column, event, cell){
		// 	console.log("@", row.id, column.label, event, cell);
		// },
		// goclick1(address){
		// 	console.log("#", address);
		// }
		//获得每个班级某个量化类型的量化明细（暂未用）
		// handleClick(column,row){
		// 	console.log(column.property, " ", column.label, " ", row.className);
		// 	axios.get("http://localhost:8080/classInfo/details?classTypeValue=" 
		// 		+ column.label + "&className=" + row.className).then(
		// 		res => {
		// 				console.log("@", column.label, " ", row.className);
		// 			this.$bus.$emit('details', res.data)
		// 			console.log(res.data);
		// 		}
		// 	)
		// }
	},	
}
</script>

<style scoped>
	::v-deep .el-dialog__header {
		background-color: #304156;
	}
	::v-deep .el-dialog__title {
		color:white;
	}

  
  .buttontop {
    margin-top: 5px; 
    margin-left: 5px;
  }

  .container {
    display: flex;
    /* min-height: 800px; */
    flex-direction: column;
	}

	.transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409EFF;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
	
</style>