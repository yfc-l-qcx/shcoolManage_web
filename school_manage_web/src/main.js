import Vue from 'vue'
import App from './App.vue'
import './assets/siderbar.css';

//引入打印组件
// import Print from './api/utils/print';

import Print from '../src/assets/vue-print-nb'

// import domain from './api/utils/domain';
// global.domain = domain;
// 引入router
import VueRouter from 'vue-router'

// 引入路由器
import router from "./router/index";



import { MessageBox } from "element-ui";


// import FileSaver from 'file-saver';
// import * as XLSX from 'xlsx'
// import XLSXS from 'xlsx-style-medalsoft';


import { Table, TableColumn, Container, DropdownItem,
  Aside, Menu, Submenu, MenuItemGroup, MenuItem, Header, Dropdown,
  DropdownMenu, Main, Footer, Input, Row, Button, Pagination, Popover,
  Form, FormItem, Option, Select, Dialog, Autocomplete, Upload, DatePicker,
  Col,
} from 'element-ui'
// import elementUi from "element-ui";
// import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
// 并把消息提示框挂载到全局使用
Vue.prototype.$confirm = MessageBox.confirm;
Vue.use(Table)
Vue.component('el-table-column', TableColumn)
Vue.component('el-menu-item-group', MenuItemGroup)
Vue.component('el-menu-item', MenuItem)
Vue.component('el-dropdown-item', DropdownItem)
Vue.component('el-dropdown-menu', DropdownMenu)

Vue.use(Container)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(Header)
Vue.use(Dropdown)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Input)
Vue.use(Row)
Vue.use(Button)
Vue.use(Pagination)
Vue.use(Popover)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Option)
Vue.use(Select)
Vue.use(Dialog)
Vue.use(Autocomplete)
Vue.use(Upload)
Vue.use(DatePicker)
Vue.use(Col)
Vue.use(VueRouter)

//注册打印组件
Vue.use(Print)


new Vue({
  el:'#app',
  router,
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this//安装全局事件总线
  }
  
})

// Vue.prototype.downTable = function (tableID, fileName, widthList) {
//   let xlsxParam = { raw: true }
//   // tableID为el-table的id名称
//   let wb = XLSX.utils.table_to_book(document.querySelector("#" + tableID), xlsxParam);
//   // widthList为表格宽度数组，单位wpx，可以不传，数组格式如[{wpx:140},{wpx:150},...]
//   let arr = [];
//   if (widthList && Array.isArray(widthList)) {
//     arr = widthList;
//   }
//   wb["Sheets"]["Sheet1"]["!cols"] = arr;
//   let wbs = wb["Sheets"]["Sheet1"];
//   // 每个单元格设置居中
//   for (const key in wbs) {
//     if (key.indexOf("!") === -1 && wbs[key].v) {
//       wbs[key].s = {
//         alignment: {
//           horizontal: "center",
//           vertical: 'center',
//           wrap_text: true,
//         }
//       }
//     }
//   }
//   // 获取二进制字符串作为输出
//   let wbout = XLSXS.write(wb, {
//     bookType: "xlsx",
//     bookSST: true,
//     type: "buffer",
//   });
//   // 下载
//   try {
//     FileSaver.saveAs(
//       new Blob([wbout], { type: "application/octet-stream" }),
//       // 设置导出文件名称
//       fileName + ".xlsx"
//     )
//   } catch (e) {
//     if (typeof console !== "undefined") console.log(e.wbout);
//   }
//   return wbout
// }

