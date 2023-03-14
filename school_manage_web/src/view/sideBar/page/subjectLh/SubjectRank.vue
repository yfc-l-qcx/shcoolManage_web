<template>
  <div>

    <el-table 
    :data="tableData" 
    ref="report-table"
    border stripe
    :row-style="{height:30+'px'}" 
    :cell-style="{padding:0+'px'}" 
    :header-cell-style="{background:'#F5F7FA',color:'#606266', height:'10px', padding:'0px'}"
    style=" width: 100%; margin-top: 5px;" >
      <el-table-column :label="ctime + '学科组量化（' + startEndTime + '）'" align="center">
        <el-table-column prop="subjectName" label="学科" width="70" align="center" />
        <el-table-column prop="subjectHeadName" label="组长" width="100" align="center" />
        <el-table-column prop="subjectNumbers" label="人数" width="50" align="center" />
        <el-table-column prop="subjectDiscipline" label="纪律" width="50" align="center" />
        <el-table-column prop="subjectHealth" label="卫生" width="50" align="center" />
        <el-table-column prop="subjectAttendClass" label="上课" width="50" align="center" />
        <el-table-column prop="subjectPrepareLesson" label="备课" width="50" align="center" />
        <el-table-column prop="subjectRethink" label="反思" width="50" align="center" />
        <el-table-column prop="subjectResearch" label="教研" width="50" align="center" />
        <el-table-column prop="subjectOpenClass" label="公开课" width="70" align="center" />
        <el-table-column prop="subjectOther" label="其他" width="50" align="center" />
        <el-table-column prop="subjectFinePrepare" label="优秀备课本" width="100" align="center" />
        <el-table-column prop="subjectFineBackboard" label="优秀板书" width="80" align="center" />
        <el-table-column prop="subjectDeductPoints" label="人均扣分" width="80" align="center" />
        <el-table-column prop="subjectRank" label="名次" width="80" align="center" />
        <el-table-column prop="subjectLhPoints" label="量化分" width="80" align="center" />
      </el-table-column>
      
		</el-table>
  </div>
</template>

<script>

import  startEndDate  from "@/api/utils/dateUtils";

export default {
  name:'SubjectRank',
  data() {
    return {
      tableData:[
        { id:1, subjectName: "语文", subjectHeadName:"张三", subjectNumbers:6, subjectDiscipline: -2, subjectHealth: -5, subjectAttendClass: -3, subjectPrepareLesson: -6, subjectRethink: -4,
        subjectResearch: -7, subjectOpenClass: -4, subjectOther: -3, subjectFinePrepare:-5, subjectFineBackboard: -3, subjectDeductPoints: -4, subjectRank: 5, subjectLhPoints: -3.44 },
        { id:1, subjectName: "数学", subjectHeadName:"李四", subjectNumbers:6, subjectDiscipline: -2, subjectHealth: -5, subjectAttendClass: -3, subjectPrepareLesson: -6, subjectRethink: -4,
        subjectResearch: -7, subjectOpenClass: -4, subjectOther: -3, subjectFinePrepare:-5, subjectFineBackboard: -3, subjectDeductPoints: -4, subjectRank: 5, subjectLhPoints: -3.44 },
        { id:1, subjectName: "英语", subjectHeadName:"王五", subjectNumbers:6, subjectDiscipline: -2, subjectHealth: -5, subjectAttendClass: -3, subjectPrepareLesson: -6, subjectRethink: -4,
        subjectResearch: -7, subjectOpenClass: -4, subjectOther: -3, subjectFinePrepare:-5, subjectFineBackboard: -3, subjectDeductPoints: -4, subjectRank: 5, subjectLhPoints: -3.44 },
        { id:1, subjectName: "物理", subjectHeadName:"赵六", subjectNumbers:6, subjectDiscipline: -2, subjectHealth: -5, subjectAttendClass: -3, subjectPrepareLesson: -6, subjectRethink: -4,
        subjectResearch: -7, subjectOpenClass: -4, subjectOther: -3, subjectFinePrepare:-5, subjectFineBackboard: -3, subjectDeductPoints: -4, subjectRank: 5, subjectLhPoints: -3.44 },
        { id:1, subjectName: "化学", subjectHeadName:"小红", subjectNumbers:6, subjectDiscipline: -2, subjectHealth: -5, subjectAttendClass: -3, subjectPrepareLesson: -6, subjectRethink: -4,
        subjectResearch: -7, subjectOpenClass: -4, subjectOther: -3, subjectFinePrepare:-5, subjectFineBackboard: -3, subjectDeductPoints: -4, subjectRank: 5, subjectLhPoints: -3.44 },
        { id:1, subjectName: "政治", subjectHeadName:"小黑", subjectNumbers:6, subjectDiscipline: -2, subjectHealth: -5, subjectAttendClass: -3, subjectPrepareLesson: -6, subjectRethink: -4,
        subjectResearch: -7, subjectOpenClass: -4, subjectOther: -3, subjectFinePrepare:-5, subjectFineBackboard: -3, subjectDeductPoints: -4, subjectRank: 5, subjectLhPoints: -3.44 },
        { id:1, subjectName: "历史", subjectHeadName:"小白", subjectNumbers:6, subjectDiscipline: -2, subjectHealth: -5, subjectAttendClass: -3, subjectPrepareLesson: -6, subjectRethink: -4,
        subjectResearch: -7, subjectOpenClass: -4, subjectOther: -3, subjectFinePrepare:-5, subjectFineBackboard: -3, subjectDeductPoints: -4, subjectRank: 5, subjectLhPoints: -3.44 },
        { id:1, subjectName: "地理", subjectHeadName:"小兰", subjectNumbers:6, subjectDiscipline: -2, subjectHealth: -5, subjectAttendClass: -3, subjectPrepareLesson: -6, subjectRethink: -4,
        subjectResearch: -7, subjectOpenClass: -4, subjectOther: -3, subjectFinePrepare:-5, subjectFineBackboard: -3, subjectDeductPoints: -4, subjectRank: 5, subjectLhPoints: -3.44 },
        { id:1, subjectName: "生物", subjectHeadName:"小黄", subjectNumbers:6, subjectDiscipline: -2, subjectHealth: -5, subjectAttendClass: -3, subjectPrepareLesson: -6, subjectRethink: -4,
        subjectResearch: -7, subjectOpenClass: -4, subjectOther: -3, subjectFinePrepare:-5, subjectFineBackboard: -3, subjectDeductPoints: -4, subjectRank: 5, subjectLhPoints: -3.44 },
        
      ],
      ctime:'初二一级部1月份',
      startEndTime:''
    }
  },
  mounted(){
    //获得当前本周开始和结束日期
		this.startEndTime = startEndDate();
		console.log("-=-=-", this.startEndTime);
  }
}
</script>

<style>

</style>