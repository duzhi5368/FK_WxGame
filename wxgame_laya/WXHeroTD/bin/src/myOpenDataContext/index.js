// console.log("index.js enter");
require("./weapp-adapter.js");
require('./libs/laya.core.js');
require('./libs/laya.wxmini.js');
require('./libs/laya.webgl.js');
require('./libs/laya.ani.js');
require('./libs/laya.ui.js');
// require('./code.js');

require("./RankItem.js");
// require('./Tool/GameDebug.js');

var baseNode = null;
var userInfo = null;

// Laya.Config.isAntialias = true;

//初始化微信小游戏
Laya.MiniAdpter.init(true, true);

//laya初始化
Laya.init(720, 1280);

//FPS
// Laya.Stat.show(0,0);
//设置适配模式 宽度不变，高度根据屏幕比缩放
Laya.stage.scaleMode = "fixedauto";
//场景布局类型 自动竖屏
Laya.stage.screenMode = "vertical";
//设置水平居中对齐
Laya.stage.alignH = "center";
//垂直居中对齐
Laya.stage.alignV = "middle";

Laya.stage.bgColor = "#191514";//设置画布的背景颜色。

// addBaseNode();
login();
// removeAllScore();




wx.onMessage(function (data) {
    login();
    Laya.stage.removeChildren();

    switch (data.act) {
        case "wxInit":
            {
                //通过接收主域的消息来设置开发数据域的画布大小跟矩阵信息
                console.log("-----------------sharedresize----------1------------------");
                console.log(data.data.matrix);
                console.log("-----------------sharedresize------------2----------------");
                if (data.data.matrix) {
                    // Laya.stage._canvasTransform = data.data.matrix;//重新设置矩阵
                    console.log(Laya.stage._canvasTransform);
                }
            }
            break;
        case "updateScore":
            updateScore(data);
            break;
        case "showRank":
        //console.log("showRank");
            showRank(data);
            break;
        case "showFriendAvatar":
            showFriendAvatar(data);
            break;
        case "showEndFriends":
        showEndFriends(data);
          break;
        case "clearChildren":
          Laya.stage.removeChildren();
          break;
    }

});


function addBaseNode() {
    if (baseNode == null) {
        baseNode = new Laya.Sprite();
        Laya.stage.addChild(baseNode);
    }
}

function login() {
    if (userInfo != null) {
        return;
    }

    wx.getUserInfo({
        openIdList: ['selfOpenId'],
        lang: 'zh_CN',
        success: function (res) {
            console.log('success', res.data)
            userInfo = res.data[0];
        },
        fail: function (res) {
            console.log('fail', res.data)
        }
    })
}

function removeAllScore() {
    wx.removeUserCloudStorage({
        keyList: ['score_' + Utils.getWeekNum()],
        success: function (res) {
          console.log('removeAllScore success', res.data)
        },
        fail: function (res) {
          console.log('removeAllScore fail', res.data)
        }
    })
}

function updateScore(data){
  // 更新之前先检查是不是最高成绩
  wx.getUserCloudStorage({
    keyList: ['score_' + Utils.getWeekNum()],
    fail: function (res) { 
      console.log(res);
      },
    success: function (res) {
      //Utils.setLocalScore(data.score);
      var result = false;

      if (res.KVDataList.length == 0) {
        result = true;
        wx.removeUserCloudStorage({
          keyList: ['score_' + (Utils.getWeekNum()-1)],
          success:function(res){console.log(res)},
          fail: function (res) { console.log(res) },
        })
      }
      else {
        var max_score = parseInt(res.KVDataList[0].value, 10);
        if (data.score >= max_score) {
          result = true;
          // 历史最高分
          // var highest = writeImage("res/openDataRes/high.png", 0, -550, 303, 68);
          // highest.anchorX = 0.5;
          // highest.anchorY = 0.5;
          // Laya.stage.addChild(highest);
        }
      }

      if (result) {
        wx.setUserCloudStorage({
          KVDataList: [
            {
              key: 'score_' + Utils.getWeekNum(),
              value: data.score.toString()
            },
          ],
          success: function (res) {
            console.log('update user score success');
            showEndFriends(null);
          }, 
          fail:function(res){
            console.log('update user score fail');
          }
        });
      }
      else
      {
        showEndFriends(null);
      }
    }
  });
}

function showEndFriends(data){
  console.log("showEndFriends");
  wx.getFriendCloudStorage({
    keyList: ['score_' + Utils.getWeekNum()],
    fail: function (res) { console.log(res) },
    success: function (res) {
      res.data = Utils.getValidData(res.data);
      res.data = Utils.scoreOrder(res.data);

      for (var i = 0; i < res.data.length; i++) {
        var item = res.data[i];
        if (item.nickname == userInfo.nickName) {
          //上一个
          var friends = new Array();
          //第一名
          if(i == 0){
            for (var j = 0; j < 3; j++) {
              //条件
              var result = false;
              //数组下标
              var index = 0;

              if (j == 0) {
                index = i;
                friends.push(index);
              }
              else if (i + j < res.data.length) {
                index = i + j;
                friends.push(index);
              }
            }
          }
          else
          {
            for (var j = 0; j < 3; j++) {
              //条件
              var result = false;
              //数组下标
              var index = 0;
              if (j == 0 && i - 1 >= 0) {
                result = true;
                index = i - 1;
                friends.push(index);
              }

              if (j == 1) {
                index = i;
                friends.push(index);
              }

              if (j == 2 && i + 1 < res.data.length) {
                index = i + 1;
                friends.push(index);
              }
            }
          }
          
          
          
          for (var i = 0; i < friends.length; i++) {
            var index = friends[i];
            var t_item = res.data[index];

            var item_start = 0;
            var item_heigh = -100;
            // 头像
            var head = writeImage(res.data[index].avatarUrl, -280, item_start + item_heigh * (1 - i), 60, 60);
            head.anchorY = 0.5;
            Laya.stage.addChild(head);

            var yuandi = writeImage("res/openDataRes/yuandi.png", -220, item_start + item_heigh * (1 - i), 42, 42);
            yuandi.anchorY = 0.5;
            Laya.stage.addChild(yuandi);

            var rank = writeText((index + 1).toString(), -220, item_start + item_heigh * (1 - i), 260, 600 + i * 90, 120, 30, 30, "white", "center");
            rank.anchorY = 0.5;
            Laya.stage.addChild(rank);

            var name = writeText(t_item.nickname, -130, item_start + item_heigh * (1 - i), 260, 600 + i * 90, 120, 30, 30, "white", "center");
            name.anchorY = 0.5;
            Laya.stage.addChild(name);

            var scoreNum = writeText(t_item.KVDataList[0].value, 100, item_start + item_heigh * (1 - i), 410, 600 + i * 90, 120, 30, 30, "#FFFFFF", "left");
            scoreNum.anchorY = 0.5;
            Laya.stage.addChild(scoreNum);

            var t_score = parseInt(t_item.KVDataList[0].value, 10);

            var t_icon = Utils.getTitleImgBySocre(t_score);
            if(t_icon != ""){
              var img_title = writeImage("res/openDataRes/"+t_icon, 170, item_start + item_heigh * (1 - i), 70, 70);
              img_title.anchorY = 0.5;
              Laya.stage.addChild(img_title);
            }

            var t_titleData = Utils.getTitleDataBySocre(t_score);

            var title = writeText(t_titleData.name, 260, item_start + item_heigh * (1 - i), 260, 600 + i * 90, 120, 30, 30, "#dbc17d", "center");
            title.anchorY = 0.5;
            Laya.stage.addChild(title);

            var img_line = writeImage("res/openDataRes/img_line.png", 0, 40 + item_heigh * (1 - i), 583, 3);
            img_line.anchorY = 0.5;
            Laya.stage.addChild(img_line);
          }
          break;
        }
      }
    }
  });
}

function showFriendAvatar(messageData) {
    wx.getFriendCloudStorage({
        keyList: ['score_' + Utils.getWeekNum()],
        success: function (res) {
            console.log(res.KVDataList);
            res.data = Utils.getValidData(res.data);
            res.data = Utils.scoreOrder(res.data);
            for (var i = 0; i < res.data.length; i++) {
                var item = res.data[i];
                if (item.nickname == userInfo.nickName) {
                    

                    if (i == 0) {
                        console.log("你已经是最高名次");
                    }
                    else {
                      var label = writeText("下一个即将超越好友：", 100, 1138, 120, 30, 24, "white", "center");
                      Laya.stage.addChild(label);
                      // 头像
                      var head = writeImage(res.data[i-1].avatarUrl, 402, 1125, 80, 80);
                      Laya.stage.addChild(head);

                      var label = writeText(res.data[i - 1].KVDataList[0].value, 502, 1138, 120, 50, 40, "white", "center");
                      Laya.stage.addChild(label);
                    }
                    break;
                }
            }
        }
    });
}

function showRank(data) {
    wx.getFriendCloudStorage({
      keyList: ['score_' + Utils.getWeekNum()],
      fail:function(res){console.log(res)},
        success: function (res) {
            console.log("getFriendCloudStorage");
            // console.log("name =" + res.data[0].nickname);
            // console.log("url =" + res.data[0].avatarUrl);
            // console.log("res.data[0] =" + res.data[0]);

            // Utils.GameLogObject(res.data[0].KVDataList);
            //有效数据--res.data里返回当前同玩好友KVDataList 没有当前key 则为长度为0
            var dataArr = Utils.getValidData(res.data);
            dataArr = Utils.scoreOrder(dataArr);

            //testData(10, dataArr);

            // var sprite = new Laya.Sprite();
            // Laya.stage.addChild(sprite);
            // sprite.loadImage("res/No.1.png");

            var list = new Laya.List();
            list.itemRender = RankItem;
            list.vScrollBarSkin = "";  // 滚动条
            list.repeatX = 1;//设置 list 的水平方向单元格数量。
            list.repeatY = 5;//设置 list 的垂直方向单元格数量。
            list.array = dataArr;
            // this.list.pos( -40, 90 );
            // list.pos(-40, 90);
            list.centerX = 0;
            list.centerY = 0;
            list.size(577, 636);
            list.renderHandler = new Laya.Handler(this, updateItem);
            Laya.stage.addChild(list);
        }
    });
}

function updateItem(cell, index) {
    cell.init(cell, index);
}


function writeImage(url, centerX, centerY,width,height)
{
  var img = new Laya.Image(url);
  // img.pos(x, y);
  img.centerX = centerX;
  img.centerY = centerY;
  img.size(width, height);
  return img;
}


/**
 * 写文字
 */
function writeText(txt, centerX, centerY, x, y, width, height, fontSize, color, align) {
    // 小球数量
    var label = new Laya.Label();
    // var label = new Laya.Text();

    label.text = txt;
    label.width = width;
    label.height = height;
    label.valign = "middle";

    label.fontSize = fontSize;
    label.color = color;
    label.align = align;
    label.font = "SimHei";
    label.bold = false;

    label.x = x;
    label.y = y;

    label.centerX = centerX;
    label.centerY = centerY;

    return label;
}



function testData(num, data) {
    for (var i = 0; i < num; i++) {
        var obj = {
            nickname: "zhou" + i,
            avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoibM43W…T3LIAvEzibQO7FQsuibRVhmzoouePibWhfhicco11V0YQ/132",
            KVDataList: [
                { 'value': 100 + i },
            ],
        }
        data.push(obj);
    }
    return data;
}
