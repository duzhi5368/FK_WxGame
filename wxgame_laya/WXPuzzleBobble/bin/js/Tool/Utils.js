/**
 * 从地址中获取数据
 */
function GetQueryString(name){
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"),
      r = window.location.search.substr(1).match(reg);
  if(r!=null)return  unescape(r[2]); return '';
}

/**
 * 返回倒计时
 * _countDownNum  倒计时总时间 毫秒
 */
function GetCountDownText(countDownNum){
    var secondNum = countDownNum / 1000;
    var minuteNum = secondNum / 60;
    var hourNum = minuteNum / 60;
    var dayNum = hourNum / 24;

    var timeText = "";
    if(dayNum > 1){
        timeText = parseInt(dayNum) +"天";
    }else if(hourNum > 1){
        timeText = parseInt(hourNum) +"小时";
    }else if(minuteNum > 1){
        timeText = parseInt(minuteNum) + "分钟";
    }else{
        timeText = parseInt(secondNum)+"秒";
    }
    return timeText;
}
/**
 * 格式化名字长度
 */
function GetFormtName(name){
    var newName = name;
    var nameNum = 0;
    for(var i=0; i<name.length; i++){
        var reg = /^[0-9a-zA-Z]*$/g;
        if (reg.test(name[i])){
            // Gamelog("----是字母数字");
            nameNum += 1;
        }else{
            nameNum += 2;
        }
        if(nameNum > 8){
            newName = name.substring(0,i+1) + "...";
            break;
        }
    }
    return newName;
}

/** 分数文字*/
function BubbleScoreAnim(_point,_score,_fontName){
    var scoreLabel = new Laya.Label(_score);
    // scoreLabel.font = _fontName !=  null ? _fontName :"shuzi5Font";
    scoreLabel.font = "SimHei";
    scoreLabel.fontSize = 40;
    scoreLabel.bold = true;
    scoreLabel.color = "#ffffff";
    scoreLabel.stroke = 5;
    scoreLabel.strokeColor = "#7d10f4";
    scoreLabel.align = "center";
    scoreLabel.anchorX = 0.5;
    scoreLabel.anchorY = 0.5;
    scoreLabel.pos(_point.x,_point.y);
    Laya.stage.addChild(scoreLabel);
    // UIManager.getInstance().getUI("GameUI").addChild(scoreLabel);
    scoreLabel.alpha = 0;
    scoreLabel.scaleX = 0;
    scoreLabel.scaleY = 0;
    scoreLabel.zOrder = 5;

    var timeLine = new Laya.TimeLine();
    timeLine.addLabel("show",0).to(scoreLabel,
    {
        alpha:1,
        scaleX:1,
        scaleY:1,
    },200).addLabel("go",0).to(scoreLabel,
    {
        y:_point.y - 40,
        alpha:0,
    },400);
    this.moveOtherBubbleFinish = false;
    timeLine.play(0,false);
    timeLine.on(Laya.Event.COMPLETE,this,function(arg){
        arg.destroy();
    },[scoreLabel]);
}

 /**微信官方对比版本号 */
function compareVersion(v1, v2) {
    v1 = v1.split('.')
    v2 = v2.split('.')
    var len = Math.max(v1.length, v2.length)
    while (v1.length < len) {
        v1.push('0')
    }
    while (v2.length < len) {
        v2.push('0')
    }
    for (var i = 0; i < len; i++) {
        var num1 = parseInt(v1[i])
        var num2 = parseInt(v2[i])
        if (num1 > num2) {
            return 1
        } else if (num1 < num2) {
            return -1
        }
    }
    return 0
}
//获取第几周
function GetWeekNum() {
    var myDate = new Date();
    // myDate.setFullYear(2018, 5, 4);
    var curDay = myDate.toLocaleDateString();
    // console.log("curDay:" + curDay);

    var dateBase = new Date();
    dateBase.setFullYear(2018, 4, 20);
    dateBase.setHours(0, 0, 0);
    // console.log("dateBase:" + dateBase.toLocaleDateString());
    var dayDiff = DateDiff("d", dateBase, myDate);
    var weekNum = Math.ceil(dayDiff / 7);
    // console.log("dayDiff = " + dayDiff);
    console.log("weekNum = " + weekNum);

    return weekNum;
}

function DateDiff(interval, date1, date2) {
    var long = date2.getTime() - date1.getTime(); //相差毫秒
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

//设置本地最高分
function SetLocalMaxScore(newScore) {
    // console.log("Utils.setLocalScore");
    // console.log("newScore = " + newScore);

    var maxScore = newScore;
    var key = "LocalHighScore_" + GetWeekNum();
    var score = LocalStorage.getItem(key);
    if (score == null || score == "") {
        LocalStorage.setItem(key, newScore);
    }
    else {
        score = parseInt(score, 10);
        if (newScore > score) {
            LocalStorage.setItem(key, newScore);
        }
        else {
            maxScore = score;
        }
    }

    // console.log("maxScore = " + maxScore);
    return maxScore;
}