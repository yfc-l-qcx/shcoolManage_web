<template>
	<div >
		<el-row >
				<add-class-details />
		</el-row>
		<!-- :row-style="{height:20+'px'}" // 更改表格内容每一行的样式，注意直接写0px或'0px'没有效果
		:cell-style="{padding:0+'px'}" // 更改表格内容每一单元格样式，注意直接写0px或'0px'没有效果
		// 更改表头每一单元格样式，此处可以直接写'0px'
		:header-cell-style="{background:'#F5F7FA',color:'#606266', height:'10px', padding:'0px'}" -->
		<!-- @cell-click="goclick" 可点击每个单元格 -->
			<el-table :data="tableData" 
								ref="report-table"
								border stripe
								
								height="545"
								:row-style="{height:20+'px'}" 
								:cell-style="{padding:0+'px'}" 
								:header-cell-style="{background:'#F5F7FA',color:'#606266', height:'10px', padding:'0px'}"
								style="width:100%; margin-top: 5px; ">
				<el-table-column label="班级量化" align="center" >
					<el-table-column prop="className" label="班级" width="50" align="center" />
					<el-table-column :label="'纪律' + jl + '%'" align="center">
						<el-table-column prop="classDiscipline" label="教室纪律" align="center" >
							<!-- <template slot-scope="scope">可获得每个单元格内容
								<div @click='goclick1(scope.row.class_Discipline)'>{{ scope.row.class_Discipline }}</div>
							</template> -->
							<template slot-scope="scope">
								<el-popover placement="top-start" trigger="click" >
									<main-popover />
									<el-button @click="handleClick(scope.column, scope.row)" slot="reference" type="text" size="large">
										{{ scope.row.classDiscipline }}
									</el-button>
								</el-popover>
							</template>
						</el-table-column>
						<el-table-column prop="classGrilDiscipline" label="女宿纪律" align="center" >
							<template slot-scope="scope">
								<el-popover placement="top-start" trigger="click" >
									<main-popover/>
									<el-button @click="handleClick(scope.column, scope.row)" slot="reference" type="text" size="large">
										{{ scope.row.classGrilDiscipline }}
									</el-button>
								</el-popover>
							</template>
						</el-table-column>
						<el-table-column prop="classManDiscipline" label="男宿纪律" align="center" >
							<template slot-scope="scope">
								<el-popover placement="top-start" trigger="click">
									<main-popover />
									<el-button @click="handleClick(scope.column, scope.row)" slot="reference" type="text" size="large">
										{{ scope.row.classManDiscipline }}
									</el-button>
								</el-popover>
							</template>
						</el-table-column>
					</el-table-column>
					<el-table-column :label="'卫生'+ ws + '%'" align="center">
						<el-table-column prop="classHealth" label="教室卫生" align="center" >
							<template slot-scope="scope">
								<el-popover placement="top-start" trigger="click">
									<main-popover />
									<el-button @click="handleClick(scope.column, scope.row)" slot="reference" type="text" size="large">
										{{ scope.row.classHealth }}
									</el-button>
								</el-popover>
							</template>
						</el-table-column>
						<el-table-column prop="classOcsd" label="卫生区" align="center" >
							<template slot-scope="scope">
								<el-popover placement="top-start" trigger="click">
									<main-popover />
									<el-button @click="handleClick(scope.column, scope.row)" slot="reference" type="text" size="large">
										{{ scope.row.classOcsd }}
									</el-button>
								</el-popover>
							</template>
						</el-table-column>
						<el-table-column prop="classGrilHealth" label="女宿卫生" align="center" >
							<template slot-scope="scope">
								<el-popover placement="top-start" trigger="click">
									<main-popover />
									<el-button @click="handleClick(scope.column, scope.row)" slot="reference" type="text" size="large">
										{{ scope.row.classGrilHealth }}
									</el-button>
								</el-popover>
							</template>
						</el-table-column>
						<el-table-column prop="classManHealth" label="男宿卫生" align="center" >
							<template slot-scope="scope">
								<el-popover placement="top" trigger="click" >
									<main-popover />
									<el-button @click="handleClick(scope.column, scope.row)" slot="reference" type="text" size="large">
										{{ scope.row.classManHealth }}
									</el-button>
								</el-popover>
							</template>
						</el-table-column>
					</el-table-column>
					<el-table-column :label="'三操' +sc +'%'" align="center">
						<el-table-column prop="classGrasp" label="三操" align="center" >
							<template slot-scope="scope">
								<el-popover placement="top" trigger="click">
									<main-popover />
									<el-button @click="handleClick(scope.column, scope.row)" slot="reference" type="text" size="large">
										{{ scope.row.classGrasp }}
									</el-button>
								</el-popover>
							</template>
						</el-table-column>
					</el-table-column>
					<el-table-column :label="'面貌' + mm + '%'" align="center">
						<el-table-column prop="classGrasp" label="精神面貌" align="center" >
							<template slot-scope="scope">
								<el-popover placement="top" trigger="click">
									<main-popover />
									<el-button @click="handleClick(scope.column, scope.row)" slot="reference" type="text" size="large">
										{{ scope.row.classGrasp }}
									</el-button>
								</el-popover>
							</template>
						</el-table-column>
					</el-table-column>
					<el-table-column :label="'班务' + bw + '%'" align="center">
						<el-table-column prop="classTeam" label="班务" align="center" >
							<template slot-scope="scope">
								<el-popover placement="top-start" trigger="click">
									<main-popover />
									<el-button @click="handleClick(scope.column, scope.row)" slot="reference" type="text" size="large">
										{{ scope.row.classGrasp }}
									</el-button>
								</el-popover>
							</template>
						</el-table-column>
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
// import * as XLSX from 'xlsx'
// import FileSaver from 'file-saver'
import axios from 'axios'
import MainPopover from "./MainPopover";
import AddClassDetails from "./AddClassDetails";
export default {
	name:'MainPage',
	components:{MainPopover, AddClassDetails},
	data(){
    return {
      tableData:[],
			lh:'量化',
			jl:40,
			ws:25,
			sc:20,
			mm:20,
			bw:10,
			
    }
	},
	mounted(){
		this.getSelectAllInfo();
		this.$bus.$on('info',(data)=>{
			this.tableData = data;
		});
		this.$bus.$emit('datas', this.tableData)
	},
	methods:{
		getSelectAllInfo(){
			axios.get("http://localhost:8080/classInfo").then(
				response =>{
					this.tableData = response.data.data;
					console.log('@', response.data);
				}
			)
		},
		// exportExcel(excelName) {
		// 	try {
		// 		const $e = this.$refs['report-table'].$el
		// 		console.log('@', $e);
		// 		let $table = $e.querySelector('.el-table__fixed')
		// 		if (!$table) {
		// 			$table = $e
		// 		}

		// 		const wb = XLSX.utils.table_to_book($table, { raw: true })
		// 		console.log('@@', wb);
		// 		const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
		// 		console.log('@@@', wbout);
		// 		FileSaver.saveAs(
		// 			new Blob([wbout], { type: 'application/octet-stream' }),
		// 			`${excelName}.xlsx`,
		// 		)
		// 	} catch (e) {
		// 		if (typeof console !== 'undefined') console.error(e)
		// 	}
		// },
		// goclick(row, column, event, cell){
		// 	console.log("@", row.id, column.label, event, cell);
		// },
		// goclick1(address){
		// 	console.log("#", address);
		// }
		handleClick(column,row){
			console.log(column.property, " ", column.label, " ", row.className);
			axios.get("http://localhost:8080/classInfo/details?classTypeValue=" 
				+ column.label + "&className=" + row.className).then(
				res => {
						console.log("@", column.label, " ", row.className);
					this.$bus.$emit('details', res.data)
					console.log(res.data);
				}
			)

		}
	},
	
}
</script>

<style scoped>

</style>