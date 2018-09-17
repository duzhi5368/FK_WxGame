/**
 * 从地址中获取数据
 */
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
        r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return '';
}

/**
 * 返回倒计时
 * _countDownNum  倒计时总时间 毫秒
 */
function GetCountDownText(countDownNum) {
    var secondNum = countDownNum / 1000;
    var minuteNum = secondNum / 60;
    var hourNum = minuteNum / 60;
    var dayNum = hourNum / 24;

    var timeText = "";
    if (dayNum > 1) {
        timeText = parseInt(dayNum) + "天";
    } else if (hourNum > 1) {
        timeText = parseInt(hourNum) + "小时";
    } else if (minuteNum > 1) {
        timeText = parseInt(minuteNum) + "分钟";
    } else {
        timeText = parseInt(secondNum) + "秒";
    }
    return timeText;
}
/**
 * 格式化名字长度
 */
function GetFormtName(name) {
    var newName = name;
    var nameNum = 0;
    for (var i = 0; i < name.length; i++) {
        var reg = /^[0-9a-zA-Z]*$/g;
        if (reg.test(name[i])) {
            // Gamelog("----是字母数字");
            nameNum += 1;
        } else {
            nameNum += 2;
        }
        if (nameNum > 8) {
            newName = name.substring(0, i + 1) + "...";
            break;
        }
    }
    return newName;
}

/** 分数文字*/
function BubbleScoreAnim(_point, _score, _fontName) {
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
    scoreLabel.pos(_point.x, _point.y);
    Laya.stage.addChild(scoreLabel);
    // UIManager.getInstance().getUI("GameUI").addChild(scoreLabel);
    scoreLabel.alpha = 0;
    scoreLabel.scaleX = 0;
    scoreLabel.scaleY = 0;
    scoreLabel.zOrder = 5;

    var timeLine = new Laya.TimeLine();
    timeLine.addLabel("show", 0).to(scoreLabel,
        {
            alpha: 1,
            scaleX: 1,
            scaleY: 1,
        }, 200).addLabel("go", 0).to(scoreLabel,
        {
            y: _point.y - 40,
            alpha: 0,
        }, 400);
    this.moveOtherBubbleFinish = false;
    timeLine.play(0, false);
    timeLine.on(Laya.Event.COMPLETE, this, function (arg) {
        arg.destroy();
    }, [scoreLabel]);
}

function lerp(point1, point2, value) {
    return new Point(point1.x + (point2.x - point1.x) * value, point1.y + (point2.y - point1.y) * value);
}


//检测是否为中文，true表示是中文，false表示非中文
function isChinese(str) {
    if (/^[\u3220-\uFA29]+$/.test(str)) {
        return true;
    } else {
        return false;
    }
}

//名字太长转换...
function labelTransform(strOld, fontSize, width) {
    var strLen = 0;
    var strNew = "";
    for (var i = 0; i < strOld.length; i++) {
        var char = strOld.charAt(i);
        var isChin = isChinese(char);
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

//获取第几周
function GetWeekNum() {
    var myDate = new Date();
    // myDate.setFullYear(2018, 5, 4);
    var curDay = myDate.toLocaleDateString();
    console.log("curDay:" + curDay);

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

/**获取圆周上的坐标 */
function GetPointOnCircle (centerPos,radius,angle)
{
    var tempX = centerPos.x + radius * (Math.cos(angle * Math.PI / 180));
    var tempY = centerPos.y + radius * (Math.sin(angle * Math.PI / 180));

    return new Point(tempX,tempY);
}
/**
 * 获得两个坐标差值
 */
function PointSub(v1,v2){
    return new Point(v1.x - v2.x, v1.y - v2.y);
}

/**获得两个坐标的距离 */
function PointDistance(v1,v2){
    var num1 = Number(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2));
    return Math.sqrt(num1);
}

/**点是否在圆内 */
function pointIsInCircle(centerPos,radius,pos){
    var num1 = Number(Math.pow(pos.x - centerPos.x, 2) + Math.pow(pos.y - centerPos.y, 2));
    var num2 = Math.pow(radius,2);
    if(num1 <num2){
        return true
    }else{
        return false;
    }
}

/**
 * 两个圆是否碰撞
 */
function isCollisionWithTwoCricle(cp1,r1,cp2,r2) {
    // console.debug("--------x1= "+Math.pow(bu1.x - bu2.x, 2)+",x2="+Math.pow(bu1.y - bu2.y, 2)+",x3="+Math.pow(randius + randius, 2));
    var num1 = Number(Math.pow(cp1.x - cp2.x, 2) + Math.pow(cp1.y - cp2.y, 2));
    var num2 = Number(Math.pow(r1 + r2, 2));
    var result = num1 < num2;
    // console.debug("---------num1="+num1+",num2="+num2+",result = "+result);
    return result;	//判断两圆是否相交, 公式：（x1-x2)^2 + (y1-y2)^2 < (r1 + r2)^2
}
/**获取称号 */
function getTitleBySocre(p_score){
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
function getTitleDataBySocre(p_score){
    for (var i = GameTitleData.length -1 ; i >=0; i--) {
        var t_data = GameTitleData[i];
        if(p_score > t_data.score){
            return t_data;
        }
    }
    return null;
}