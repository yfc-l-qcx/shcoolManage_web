import * as XLSX from 'xlsx'
import XLSXStyle from "xlsx-style";
import FileSaver from 'file-saver'
export function exportExcel(excelName, tableName) {
  try {
    console.log("#", tableName);
    const $e = this.$refs[tableName].$el
    console.log('@', $e);
    let $table = $e.querySelector('.el-table__fixed')
    if (!$table) {
      $table = $e
    }
    const wb = XLSX.utils.table_to_book($table, { raw: true })

    const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })

    FileSaver.saveAs(
      new Blob([wbout], { type: 'application/octet-stream' }),
      `${excelName}.xlsx`,
    )
  } catch (e) {
    if (typeof console !== 'undefined') console.error(e)
  }
}
//导出量化明细
export function export2Excel(titleName, tableData) {
  require.ensure([], () => {
    const { export_json_to_excel } = require('@/excel/Export2Excel');
    const tHeader = ['班级', '班主任', '量化类型', '违纪内容', '扣分',
      '上传时间'
    ];
    const filterVal = ['className', 'classTeacher', 'classType',
      'classDetail', 'classPoints', 'classDated'
    ];

    // const data = this.formatJson(filterVal, tableData);
    const data = tableData.map(v => filterVal.map(j => v[j]))
    export_json_to_excel(tHeader, data, titleName);
  })
}

//导出量化明细
export function exportExcelModel(titleName, tableData) {
  require.ensure([], () => {
    const { export_json_to_excel } = require('@/excel/Export2Excel');
    const tHeader = ['班级', '班主任', '量化类型', '违纪内容', '扣分'];
    const filterVal = ['className', 'classTeacher', 'classType',
      'classDetail', 'classPoints'];

    // const data = this.formatJson(filterVal, tableData);
    const data = tableData.map(v => filterVal.map(j => v[j]))
    export_json_to_excel(tHeader, data, titleName);
  })
}





export function exportToExcel() {
  let ws = XLSX.utils.table_to_sheet(document.getElementById('exportData'))
  let ws2 = XLSX.utils.table_to_sheet(document.getElementById('exportData'))
  //创建一个workbook对象
  let wb = XLSX.utils.book_new()
  //把worksheet对象添加进workbook对象，第三个参数是excel中sheet的名字
  XLSX.utils.book_append_sheet(wb, ws, '月度统计报表')
  XLSX.utils.book_append_sheet(wb, ws2, '隔离库')
  this.setExlStyle(wb['Sheets']['月度统计报表']); // 设置列宽 字号等 如果无需多余的样式则省略
  this.addRangeBorder(wb['Sheets']['月度统计报表']['!merges'], wb['Sheets']['月度统计报表']) //设置合并行的border
  let wb_out = XLSXStyle.write(wb, { type: 'buffer' })

  try {
    FileSaver.saveAs(new Blob([wb_out], {
      type: 'application/octet-stream'
    }), 'WMS统计报表.xlsx');   // 导出的文件名
  } catch (e) {
    console.log(e, wb_out);
  }
  return wb_out;
}

export function setExlStyle(data) {
  let borderAll = {  //单元格外侧框线
    top: {
      style: 'thin',
    },
    bottom: {
      style: 'thin'
    },
    left: {
      style: 'thin'
    },
    right: {
      style: 'thin'
    }
  };
  data['!cols'] = [];
  for (let key in data) {
    // console.log(key)
    if (data[key] instanceof Object) {
      data[key].s = {
        border: borderAll,
        alignment: {
          horizontal: 'center',   //水平居中对齐
          vertical: 'center'
        },
        font: {
          sz: 11
        },
        bold: true,
        numFmt: 0
      }
      data['!cols'].push({ wpx: 115 });
    }
  }
  return data;
}
export function addRangeBorder(range, ws) {
  let cols = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  range.forEach(item => {
    console.log(item)
    let style = {
      s: {
        border: {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        }
      }
    }
    // 处理合并行
    for (let i = item.s.c; i <= item.e.c; i++) {
      ws[`${cols[i]}${Number(item.e.r) + 1}`] = ws[`${cols[i]}${Number(item.e.r) + 1}`] || style
      // 处理合并列
      for (let k = item.s.r + 2; k <= item.e.r + 1; k++) {
        ws[cols[i] + k] = ws[cols[k] + item.e.r] || style
      }
    }
  })
  return ws;
}