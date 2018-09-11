// pages/yue/index.js
var requesturl = getApp().globalData.requesturl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardId: "", //会员卡id
    cardno: "", //会员卡号
    pageIndex: 1, //页面下标
    sumjifen: 0,//总积分
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
   console.log("余额参数:");
   console.log(options); 
    that.setData({
      cardId: options.cardId, //会员卡id
      cardno: options.cardno, //会员卡号
      sumjifen: options.yue
    })
    that.initYue();
  },
  //初始化数据
  initYue: function() {
    var that = this;

    //请求接口参数
    wx.request({
      url: requesturl + 'getBalanceRecordList',
      data: {
        code: that.data.cardno,
        cardId: that.data.cardId,
        page: that.data.pageIndex
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        console.log("余额数据:");
        console.log(res);

        that.setData({
          datalist: res.data.data,//积分记录
        })
      }
    })
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
    var that=this;

    that.setData({
      pageIndex:1
    })
    that.initYue();
    // 隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this;

    that.setData({
      pageIndex:that.data.pageIndex+1
    })
    that.initYue();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})