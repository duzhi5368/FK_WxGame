// pages/shoucang/index.js
var requesturl = getApp().globalData.requesturl;//请求接口的地址
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cakelist:[],//收藏的列表
    tianlist: [0,1, 2, 3, 4],//甜度列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that=this;

     //得到收藏的列表
     that.getcakelist();
  },
  //获取蛋糕列表
  getcakelist: function () {
    var that = this;

    //得到对应的蛋糕列表
    var cakelist = testdata.getcakelist(1);

    that.setData({
      cakelist: cakelist
    })
    //结束标识符
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