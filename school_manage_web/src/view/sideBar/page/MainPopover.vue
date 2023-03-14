<template >
  <el-table :data="gridData">
    <el-table-column width="150" property="className" label="班级"></el-table-column>
    <el-table-column width="100" property="classType" label="类型"></el-table-column>
    <el-table-column width="150" property="classDetail" label="详情"></el-table-column>
    <el-table-column width="100" property="classPoints" label="扣分"></el-table-column>
  </el-table>
</template>

<script>

export default {
  name:'MainPopver',
  mounted(){
    
    // this.$bus.$on('details',(data) =>{

    //   this.gridData = data.details;
    // })
  },
  beforeCreate(){
    this.$bus.$on('details', (data) => {
      console.log("dd");
      this.gridData = data.details;
    })
  },
  data(){
    return {
      gridData: []
    }
  }

}
</script>

<style>

</style>