// pages/getmobile/index.js
var requesturl=getApp().globalData.requesturl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  getPhoneNumber:function(e){
    var that=this;
    //获取手机号码
    console.log(e);
    
    if (e.detail.errMsg != "getPhoneNumber:ok"){
      wx.openSetting({
        success: function () {
          that.onLoad();
        }
      })
    }else{
      var encryptedData = e.detail.encryptedData;
      var iv=e.detail.iv;
      
      wx.request({
        url: requesturl+'getUserPhone',
        data: {
          openid:getApp().globalData.openID,
          encryptedData: encryptedData,
          iv:iv
        },
        header: {
          "Content-Type":"application/x-www-form-urlencoded"
        },
        method: 'POST',
        success: function(res) {
          console.log("获取手机号码:");
          console.log(res);
           wx.switchTab({
             url: '../index/index',
           })
        }
      })
    }
  
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})