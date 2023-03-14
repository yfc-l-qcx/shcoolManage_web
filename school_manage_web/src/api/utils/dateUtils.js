export default function startEndDate() {
  let data = new Date() //当前日期
  let year = Number(data.getFullYear());//当前年
  let month = Number(data.getMonth())+1;
  let nowMonth =Number(data.getMonth()); //当前月
  let day = Number(data.getDate()); //当天
  //计算某日是本月第几周
  let mydate=new Date(year,month-1,day);
  let weekday=mydate.getDay(); //获取该日是星期几，0代表星期日//今天本周的第几天
  let weekno=Math.ceil((day + 6 - weekday) / 7); // 本月第几周
  console.log("本月第几周:"+weekno)
  //获取当前周的开始结束时间
  let startTime //本周的开始时间
  let endTime //本周的结束时间
  function formatDate(date) {
  // let myyear = Number(date.getFullYear());
  let mymonth = Number(date.getMonth()+1);
  let myweekday = Number( date.getDate());
  if(mymonth < 10){
  mymonth = "0" + mymonth;
  }
  if(myweekday < 10){ 
  myweekday = "0" + myweekday; 
  } 
  return (mymonth + "." + myweekday);
  }
  //获得本周的开始日期
  function getWeekStartDate() {
  let weekStartDate = new Date(year, nowMonth, day + 1 - weekday);
  return formatDate(weekStartDate);
  }
  //获得本周的结束日期
  function getWeekEndDate() {
  let weekEndDate = new Date(year, nowMonth, day + 7 - weekday);
  return formatDate(weekEndDate);
  } 
  startTime=getWeekStartDate()
  endTime=getWeekEndDate()
  console.log("开始日期:"+startTime+"结束日期: "+endTime)
  return startTime +"-"+ endTime;
}
  