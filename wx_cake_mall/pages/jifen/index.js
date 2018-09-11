// pages/jifen/index.js
var requesturl = getApp().globalData.requesturl; //请求接口的地址
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sumjifen:0,//总积分
    datalist:[],//积分记录
    cardno: "",//会员卡编号
    cardId: "",//会员卡id
    pageIndex:1,//页面下标
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log("获取积分参数值:");
    console.log(options);
    //接受参数
    that.setData({
      sumjifen:options.jifen,//总积分
      cardno: options.cardno,//会员卡编号
      cardId: options.cardId,//会员卡id
    })
    //积分数据
    that.initJifen();
  },
  //积分数据
  initJifen:function(){
    var that=this;

    wx.request({
      url: requesturl +'getBonusRecordList',
      data: {
        code: that.data.cardno,
        cardId: that.data.cardId,
        page: that.data.pageIndex
      },
      header: {
        "Content-Type":"application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        console.log("获取积分数据:");
        console.log(res);
      
        that.setData({
          datalist: res.data.data
        })
      }
    })
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
     var that=this;
     that.setData({
       pageIndex: 1
     })
     that.initJifen();
    // 隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    that.setData({
      pageIndex: that.data.pageIndex+1
    })
    that.initJifen();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})