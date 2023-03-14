<template>
  <div>
    <el-table stripe
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="username"
        label="姓名"
        width="250"
        style="text-align: center">
      </el-table-column>
      <el-table-column
        prop="password"
        label="密码"
        width="250">
      </el-table-column>
      <el-table-column
        prop="user_power"
        label="权限"
		width="150">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[2, 5, 10, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import axios from "axios";
export default {
	// eslint-disable-next-line vue/multi-word-component-names
	name:'Login',
	data() {
		return {
				tableData: [],
        pageNum:1,
        total:0,
        pageSize:2
		}
	},
	mounted(){
		this.tableData = this.getInfo();
		this.$bus.$on('usersInfo', (data) => {
			this.tableData = data.data;	
      this.total = data.total ;
		})
	},
	methods:{
    // 获取后台分页数据
		getInfo(){
      // this.$bus.$emit('page', this.pageNum)  
			axios.get("http://localhost:8080/user/page?pageNum="+this.pageNum+"&pageSize="+this.pageSize).then(
				res => {
					this.tableData = res.data.data
          this.total = res.data.total
          console.log(res.data.total);
				}
			)
		},
    refresh(){
      setTimeout(() => {
        this.getInfo()
      }, 10);
    },
    //添加数据
		handleEdit(index, row){
      console.log("handleEdit:index=", index, " row=", row);
      axios({
        method:'post',
        url:'http://localhost:8080/user/',
        data:{
          id: row.id,
          username: row.username,
          password: row.password,
          user_power: row.user_power
        }
      })
      this.refresh()
    },
    //删除数据
    handleDelete(index, row){
      console.log("handleDelete:index=", index, " row=", row);
      axios({
        method:'delete',
        url:`http://localhost:8080/user/${row.id}`
       
      })
      //重新展示删除后的数据
      // this.tableData = this.tableData.filter((datas) =>{
      //   return datas.id !== row.id;
      // })
      this.refresh()
    },
    handleSizeChange(pageSize) {
      console.log(`每页 ${pageSize} 条`);
      this.pageSize = pageSize
      this.getInfo()

    },
    handleCurrentChange(pageNum) {
      console.log(`当前页: ${pageNum}`);
      this.pageNum = pageNum
      this.getInfo()
    }
	}
    
}
</script>

<style>
</style>