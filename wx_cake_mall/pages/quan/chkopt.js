// pages/quan/chkopt.js
var requesturl = getApp().globalData.requesturl;//请求接口的地址
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sumprice:0,//总价
    chkquan: 0,//选择的菜单
    quanprice:0,//券的价格
    quanlist: [],//优惠券列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      sumprice: parseFloat(options.sumprice)
    })
    //获取所有的优惠券
    that.getquanlist();
  },
  //获取所有的优惠券
  getquanlist: function () {
    var that = this;
    //参数部分
    var sumprice = that.data.sumprice;

    //查询得到优惠券信息
    var quanlist = [];
    wx.request({
      url: requesturl +'getGifCardListInbag',
      data: {
        openid:getApp().globalData.openID
      },
      header: {
        "Content-Type":"application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        console.log("获取优惠券列表数据:");
        console.log(res);

        if(res.data.code===0){
          that.setData({
            quanlist: res.data.data
          })
        }
      }
    })
  },  
  //立即使用
  useopt: function (e) {
    var that = this;

    //参数部分
    var id = e.currentTarget.dataset.id;
    var price = e.currentTarget.dataset.price;
    
    //设置全局变量
    getApp().globalData.quanid = id;
    getApp().globalData.quanprice = price;
    getApp().globalData.ischkquan = false;
    //返回前一个页面
    wx.navigateBack({
      delta:1
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