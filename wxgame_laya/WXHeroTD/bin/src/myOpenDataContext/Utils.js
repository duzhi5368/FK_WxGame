function Utils() {
  RankItem.super(this);
}

Laya.class(Utils, "Utils", null);


//检测是否为中文，true表示是中文，false表示非中文
Utils.isChinese = function (str){
  if (/^[\u3220-\uFA29]+$/.test(str)) {
    return true;
  } else {
    return false;
  }
}

Utils.labelTransform = function (strOld, fontSize, width) {
  var strLen = 0;
  var strNew = "";
  for (var i = 0; i < strOld.length; i++) {
    var char = strOld.charAt(i);
    var isChin = Utils.isChinese(char);
    // Gamelog(char + ":" + isChin);
    if (isChin) {
      strLen = strLen + fontSize;
    }
    else {
      strLen = strLen + fontSize / 2;
    }

    if (strLen > width - fontSize) {
      strNew = strNew + "..";
      break;
    }
    else {
      strNew = strNew + char;
    }
  }

  return strNew;
}


Utils.GameLogObject = function(obj) {
  var description = "";
  for (var i in obj) {
    description += i + " = " + obj[i] + "\n";
  }
  console.log(description);
}

/**
 * 根据成绩排序
 */
Utils.scoreOrder = function(arr) {
  if (arr.length <= 1)
  {
    return arr;
  }
  arr.sort(function (a, b) {
    return b.KVDataList[0].value - a.KVDataList[0].value;
  });

  return arr;
}

Utils.getValidData = function(arr){
  //有效数据--res.data里返回当前同玩好友KVDataList 没有当前key 则为长度为0
  var dataArr = new Array();
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].KVDataList.length > 0) {
      dataArr.push(arr[i]);
    }
  }

  return dataArr;
}

//获取第几周
Utils.getWeekNum = function(){
  var myDate = new Date();
  // myDate.setFullYear(2018, 10, 28);
  // myDate.setHours(0, 0, 0);
  // var curDay = myDate.toLocaleString();
  // console.log("curDay:" + myDate);

  var dateBase = new Date();
  dateBase.setFullYear(2018, 4, 20);
  dateBase.setHours(0,0,0);
  // console.log(dateBase);
  var dayDiff = Utils.DateDiff("d", dateBase, myDate);
  // console.log("dayDiff = " + dayDiff);
  var weekNum = Math.ceil(dayDiff / 7);
  console.log("weekNum = " + weekNum);

  return weekNum;
}

Utils.DateDiff = function (interval, date1, date2) {
  var long = date2.getTime() - date1.getTime(); //相差毫秒
  // console.log("Difflong = " + long);
  switch (interval.toLowerCase()) {
    case "y": return parseInt(date2.getFullYear() - date1.getFullYear());
    case "m": return parseInt((date2.getFullYear() - date1.getFullYear()) * 12 + (date2.getMonth() - date1.getMonth()));
    case "d": return parseInt(long / 1000 / 60 / 60 / 24);
    case "w": return parseInt(long / 1000 / 60 / 60 / 24 / 7);
    case "h": return parseInt(long / 1000 / 60 / 60);
    case "n": return parseInt(long / 1000 / 60);
    case "s": return parseInt(long / 1000);
    case "l": return parseInt(long);
  }
}

Utils.setLocalScore = function(newScore){
  console.log("Utils.setLocalScore");
  // var score = laya.net.LocalStorage.getItem("localHighScore");
  var score = wx.getStorageSync("localHighScore");
  if (score == null || score == "") {
    // LocalStorage.setItem("localHighScore", newScore);
    wx.setStorageSync("localHighScore", newScore.toString());
  }
  else{
    score = parseInt(score, 10);
    if (newScore > score){
      // LocalStorage.setItem("localHighScore", newScore);
      wx.setStorageSync("localHighScore", newScore.toString());
    }
  }
}

Utils.getLocalScore = function () {
  var res = null;
  var score = LocalStorage.getItem("localHighScore");
  if (score == null || score == "") {

  }
  else {
    res = parseInt(score, 10);
  }

  return res;
}

/**获取称号 */
Utils.getTitleBySocre = function(p_score){
    var t_title = "";
    for (var i = GameTitleData.length -1 ; i >=0; i--) {
        var t_data = GameTitleData[i];
        if(p_score > t_data.score){
            t_title = t_data.name;
            break;
        }
    }
    return t_title;
}

/**获取称号数据 */
Utils.getTitleDataBySocre = function(p_score){
    for (var i = GameTitleData.length -1 ; i >=0; i--) {
        var t_data = GameTitleData[i];
        if(p_score > t_data.score){
            return t_data;
        }
    }
    return null;
}

/**获取称号图片 */
Utils.getTitleImgBySocre = function(p_score){
    var t_icon = "";
    for (var i = GameTitleData.length -1 ; i >=0; i--) {
        var t_data = GameTitleData[i];
        if(p_score > t_data.score){
            t_icon = t_data.icon;
            break;
        }
    }
    return t_icon;
}

/**游戏称号数据 */
var GameTitleData = [
    {
        score:-1,
        name:"石头守卫",
        icon:"",
        color:"#8dc1bd",
    },
    {
        score:2000,
        name:"英勇黄铜",
        icon:"xunzhang-01.png",
        color:"#bb885f",
    },
    {
        score:4000,
        name:"不屈白银",
        icon:"xunzhang-02.png",
        color:"#c3fcf9",
    },
    {
        score:7000,
        name:"荣耀黄金",
        icon:"xunzhang-03.png",
        color:"#ffdb49",
    },
    {
        score:10000,
        name:"华贵铂金",
        icon:"xunzhang-04.png",
        color:"#424fff",
    },
    {
        score:15000,
        name:"璀璨钻石",
        icon:"xunzhang-05.png",
        color:"#ffa5fe",
    },
    {
        score:20000,
        name:"超凡大师",
        icon:"xunzhang-06.png",
        color:"#ff005a",
    },
    
    
];