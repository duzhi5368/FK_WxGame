// pages/login/index.js
var requesturl = getApp().globalData.requesturl; //请求接口的地址
var util = require('../../utils/util.js'); //工具类
Page({

  /**
   * 页面的初始数据
   */
  data: {},
  //授权登录
  getUserInfo: function(e) {
    var that = this;
    console.log("用户信息")
    console.log(e);
    if (e.detail.userInfo == undefined) {
      wx.openSetting({
        success: function () {
          that.onLoad();
        }
      })
    } else {
      wx.showLoading({
        title: '正在登录中...',
        mask: true
      })
      getApp().globalData.userInfo = e.detail.userInfo;
      var encryptedData=e.encryptedData;
      var iv=e.iv;
   
      //获取unionId
      wx.request({
        url: getApp().globalData.requesturl + 'getUnionId',
        data: {
          openid: getApp().globalData.openID,
          encryptedData: encryptedData,
          iv: iv
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        success: function (res) {
          console.log("获取unionId的结果");
          console.log(res);

          //跳转到获取手机号码
          wx.navigateTo({
            url: '../getmobile/index',
          })

          wx.hideLoading();
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '用户授权',
    })
    wx.hideShareMenu();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})