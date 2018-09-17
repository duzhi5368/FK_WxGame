
if(Browser.onMiniGame){

    wx.getSetting({
    success: function (res) {
        var authSetting = res.authSetting
        if (authSetting['scope.userInfo'] === true) {
        // 用户已授权，可以直接调用相关 API
        console.log("获取用户信息成功");
        getWxUserInfo();
        } else if (authSetting['scope.userInfo'] === false) {
        // 用户已拒绝授权，再调用相关 API 或者 wx.authorize 会失败，需要引导用户到设置页面打开授权开关
        wx.openSetting();
        } else {
        // 未询问过用户授权，调用相关 API 或者 wx.authorize 会弹窗询问用户
        showUserInfoBtn();
        }
    },
    fail: function (res) {
        console.log("获取设置失败");
    }
    })

    function showUserInfoBtn(){
        var button = wx.createUserInfoButton({
            type: 'text',
            text: '授权用户信息',
            style: {
            left: 100,
            top: 76,
            width: 200,
            height: 40,
            lineHeight: 40,
            backgroundColor: '#ff0000',
            color: '#ffffff',
            textAlign: 'center',
            fontSize: 16,
            borderRadius: 4
            }
        })
        button.onTap(function (res) {
            console.log(res)
            button.hide();
        })
        button.show();
    }

    function getWxUserInfo(){
    wx.getUserInfo({
        success: function (res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
        }
    })
    }

    wx.showShareMenu()
    wx.onShareAppMessage(function () {
    // 用户点击了“转发”按钮
    return {
        title: '最好玩的泡泡龙，快来比试一下吧！',
        imageUrl:"game/shard.png"
    }
    })

    let openDataContext = wx.getOpenDataContext()
    let sharedCanvas = openDataContext.canvas

    // openDataContext.postMessage({
    //   text: 'hello',
    //   year: (new Date()).getFullYear()
    // })

    // openDataContext.postMessage({
    //     msgType:1,
    // })

    // console.log(sharedCanvas.width);

    // setTimeout(function () {
    // let canvas = wx.createCanvas()

    // let context = canvas.getContext('2d')

    // context.drawImage(sharedCanvas, 0, 0)
    // // console.log(sharedCanvas.width);

    // }, 1000);

}