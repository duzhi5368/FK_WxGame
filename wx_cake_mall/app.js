//app.js
var loginStatus = true;

App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this;
    // 登录
    wx.login({
      success: logincode => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        that.globalData.code = logincode.code;
        var code = logincode.code;
        console.log("CODE的值:" + code);

        //获取openid的值
        wx.request({
          url: that.globalData.requesturl + 'wxlogin',
          data: {
            code: code
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: 'POST',
          success: function(jieguo) {

            getApp().globalData.openID = jieguo.data.data; //用户的唯一标识  
            console.log("openID:" + getApp().globalData.openID);

            if (jieguo.data.code != 0) {
              wx.redirectTo({
                url: '../login/index',
              })
            }
          }
        })
        //结束标识符
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
              console.log("登录授权:");
              console.log(res);

              //获取unionId
              wx.request({
                url: getApp().globalData.requesturl + 'getUnionId',
                data: {
                  openid: getApp().globalData.openID,
                  encryptedData: res.encryptedData,
                  iv: res.iv
                },
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                method: 'POST',
                success: function(res) {
                  console.log("获取unionId的结果");
                  console.log(res);
                  wx.hideLoading();
                }
              })
            },
            fail: function() {
              wx.redirectTo({
                url: '../login/index',
              })
            },
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null, //用户信息
    openid: '', //OPENID 
    ismember: false, //是否是会员
    membername: '', //会员卡姓名
    memberpwd: '', //会员卡密码
    memberphone: '', //会员卡手机号
    requesturl: 'https://www.porvoe.xyz/WXMall/MullManage/API/', //请求url  
    addressid: '', //地址id
    addressuser: '', //地址人
    addresstel: '', //地址电话
    addresstxt: '', //地址内容
    addresssex: '', //地址性别
    addresslat: 0, //地址纬度
    addresslng: 0, //地址经度
    yunfee: 0, //运费
    ischkquan: false, //订单选择券
    quanid: "", //购物券id
    quanprice: 0, //券的钱
    isshop: false,
    shopid: "", //门店id
    shopname: "", //店名
    shoptel: "", //店铺电话
    shopaddr: "", //地址
  }
})