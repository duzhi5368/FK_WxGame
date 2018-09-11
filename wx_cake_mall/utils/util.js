//时间的格式化
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//今天的日期
const todayTime = n => {
  var date=new Date();
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()


  return year + "-" + formatNumber(month) + "-" + formatNumber(day)
}

//当前的时间
const nowDT = n => {
  var date=new Date();
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

//当前的时间运算
const nowDTOpt = n => {
  var date = new Date();
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()+n
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

//配送时间段
var timelist = [
  {
    id: 1,
    start: "08",
    end: "09",
    status: 1
  },
  {
    id: 2,
    start: "09",
    end: "12",
    status: 1
  },
  {
    id: 3,
    start: "12",
    end: "14",
    status: 1
  },
  {
    id: 4,
    start: "14",
    end: "23",
    status: 1
  }
]

const sendTime = n => {
  var date = new Date();
  const hour = date.getHours()
  var txtarry=[];
  //循环遍历，重新赋值
  for (var i = 0; i < timelist.length;i++)
  {
    var start = parseInt(timelist[i].start);
    var end = parseInt(timelist[i].end);

    if (hour >end) {
      txtarry[i] = {
        id: timelist[i].id,
        start: timelist[i].start,
        end: timelist[i].end,
        status: 0
      }
    }
    else if (hour >= start && hour < end) {
      txtarry[i]={
        id: timelist[i].id,
        start: timelist[i].start,
        end: timelist[i].end,
        status: 1
      }
    } else {
      txtarry[i] = {
        id: timelist[i].id,
        start: timelist[i].start,
        end: timelist[i].end,
        status:1
      }
    }
  }
  
  return txtarry
}



// 通过正则来检验手机号是否有效
var validateMobile = function (txt) {
  var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
  return reg.test(txt)
}



module.exports = {
  formatTime: formatTime,
  todayTime: todayTime,
  sendTime: sendTime,//送货时间
  validateMobile: validateMobile,//验证手机号码
  nowDT: nowDT,//当前时间
  nowDTOpt: nowDTOpt,//当前时间运算
}
