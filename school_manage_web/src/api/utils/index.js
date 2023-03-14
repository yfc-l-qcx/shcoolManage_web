// 转换成二进制数据
export function readFile(file) {
  return new Promise(resolve =>{
    let reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = ev => {
        resolve(ev.target.result);
    };
  });
}

// 批量插入班级量化明细 字段对应表
export let character = {
  className: {
    text: "班级",
    type: "string"
  },
  classTeacher: {
    text: "班主任",
    type: "string"
  },
  classDetail: {
    text: "违纪内容",
    type: "string"
  },
  classPoints: {
    text: "扣分",
    type: "string"
  },
  classType: {
    text: "量化类型",
    type: "string"
  }
} 

//导入每周量化数据字段
export let character1 = {
  className: {
    text: "班级",
    type: "string"
  },
  classDiscipline: {
    text: "教室纪律",
    type: "string"
  },
  classGrilDiscipline: {
    text: "女宿纪律",
    type: "string"
  },
  classManDiscipline: {
    text: "男宿纪律",
    type: "string"
  },
  classHealth: {
    text: "教室卫生",
    type: "string"
  },
  classOcsd: {
    text: "卫生区",
    type: "string"
  },
  classGrilHealth: {
    text: "女宿卫生",
    type: "string"
  },
  classManHealth: {
    text: "男宿卫生",
    type: "string"
  },
  classTeacher: {
    text: "班主任",
    type: "string"
  },
  classGrasp: {
    text: "三操",
    type: "string"
  },
  classSpirit: {
    text: "精神面貌",
    type: "string"
  },
  classTeam: {
    text: "班务",
    type: "string"
  },
  classQuantization: {
    text: "行为量化",
    type: "string"
  },
  classRanking: {
    text: "排名",
    type: "string"
  },
  classRemark: {
    text: "备注",
    type: "string"
  }
}

//导入教师信息字段
export let character2 = {
  teacherName: {
    text: "姓名",
    type: "string"
  }, 
  schoolArea: {
    text: "校区",
    type: "string"
  }, 
  gradeName: {
    text: "年级",
    type: "string"
  }, 
  deptName: {
    text: "级部",
    type: "string"
  }, 
  className: {
    text: "班级",
    type: "string"
  }, 
  subjectName: {
    text: "学科",
    type: "string"
  }, 
  telName: {
    text: "电话",
    type: "string"
  }, 
  IdCard: {
    text: "身份证号",
    type: "string"
  }, 
  address: {
    text: "住址",
    type: "string"
  }, 
    
}
//设置异步间隔延迟
export function delay(interval = 0) {
    return new Promise(resolve =>{
        let timer = setTimeout(_ =>{
            clearTimeout(timer);
            resolve();
        }, interval);
    });
}