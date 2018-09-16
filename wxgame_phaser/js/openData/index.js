let sharedCanvas = wx.getSharedCanvas()
let context = sharedCanvas.getContext('2d')

context.clearRect(0, 0, 375, 667);

wx.onMessage(data => {
  //console.log(data);

  // 获取存储数据
  if(data.action === "GET_SCORE") {
    wx.getUserCloudStorage({
      keyList: ["score"],
      success: function(obj) {
        context.clearRect(0, 0, 375, 667);
        context.fillStyle = "rgb(250, 250, 250)";
        context.font = "24px Arial";
        context.textAlign = "left";
        context.textBaseline = "top";

        if(obj.KVDataList) {
          for(var i=0; i<obj.KVDataList.length; i++) {
            context.fillText('获取到数据: ' + obj.KVDataList[i].key + ' = ' + obj.KVDataList[i].value, 60, i * 35 + 12);
          }
        } else {
          context.fillText('云端服务器当前没有任何数据!', 60, 35 + 12);
        }
      },
      fail: function() {
        context.clearRect(0, 0, 375, 667);
        context.fillStyle = "rgb(250, 250, 250)";
        context.font = "24px Arial";
        context.textAlign = "left";
        context.textBaseline = "top";
        context.fillText('获取云端服务器数据失败!', 60, 35 + 12);
      },
      complete: function() {
        //console.log('get data complete');
      }
    });
  } 
  
  // 好友分数
  else if(data.action === "GET_FRIEND_SCORE") {
    wx.getFriendCloudStorage({
      keyList: ["score"],
      success: function(obj) {
        console.log(obj)
        if(obj.data) {
          for(var i=0; i<obj.data.length; i++) {
            console.log('get ' + obj.data[i].nickname + ' : ' + obj.data[i].avatarUrl);
            if(obj.data[i].KVDataList) {
              for(var j=0; j<obj.data[i].KVDataList.length; j++) {
                console.log('get ' + obj.data[i].KVDataList[j].key + ' : ' + obj.data[i].KVDataList[j].value);
              }
            }
          }
        } else {
          console.log('KVDataList null');
        }
      },
      fail: function() {
        console.log('get friend data fail');
      },
      complete: function() {
        console.log('get friend data complete');
      }
    })
    
  // 排行榜  
  } else if(data.action === "SHOW_RANKING_LIST") {
    wx.getFriendCloudStorage({
      keyList: ["score"],
      success: function(obj) {
        console.log(obj)
        if(obj.data) {
          for(var i=0; i<obj.data.length; i++) {
            console.log('get ' + obj.data[i].nickname + ' : ' + obj.data[i].avatarUrl);
            if(obj.data[i].KVDataList) {
              for(var j=0; j<obj.data[i].KVDataList.length; j++) {
                console.log('get ' + obj.data[i].KVDataList[j].key + ' : ' + obj.data[i].KVDataList[j].value);
              }

              //console.log('start show ranking list');
              context.clearRect(0, 0, 375, 667);
              context.fillStyle = "rgba(64, 64, 64, 0.5)";
              context.fillRect(0, 0, 375, 667);

              for (var i=0; i<obj.data.length; i++) {

                context.fillStyle = "rgba(255,255,255,0.1)";
                context.fillRect(5, i*35 + 5, 300, 30);

                // 头像
                var avatar = wx.createImage();
                avatar.src = obj.data[i].avatarUrl;
                avatar.onload = (function(c,a,i){
                  return function(){
                    c.drawImage(a, 30, i*35+8, 24, 24);
                  };
                })(context,avatar,i); // 这里是异步执行，要做个闭包处理

                context.fillStyle = "rgb(250, 250, 250)";
                context.font = "12px Arial";
                context.textAlign = "left";
                context.textBaseline = "top";
                context.fillText(i+1, 10, i*35 + 12); // 名次
                context.fillText(obj.data[i].nickname, 60, i*35 + 12); // 昵称
                context.textAlign = "right";
                context.fillText(obj.data[i].KVDataList[0].value, 285, i*35 + 12); // 分数

              }

              console.log('show ranking list complete');
            }
          }
        } else {
          console.log('KVDataList null');
        }
      },
      fail: function() {
        console.log('get friend data fail');
      },
      complete: function() {
        console.log('get friend data complete');
      }
    })
  }
});
