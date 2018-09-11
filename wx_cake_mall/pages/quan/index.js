// pages/quan/index.js
var requesturl = getApp().globalData.requesturl;//请求接口的地址
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chkmenu:0,//选择的菜单
    quanlist:[],//优惠券列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;

    //获取所有的优惠券
    that.getnoquanlist();
  },
  //获取未领取所有的优惠券
  getnoquanlist:function(){
    var that = this;

    //查询得到优惠券信息
    wx.request({
      url: requesturl + 'getGifCardListNobag',
      data: {
        openid: getApp().globalData.openID
      },
      header: {
        "Content-Type": "applictaion/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function (res) {
        console.log("获取优惠券列表:");
        console.log(res);

        if (res.data.code == 0) {
          that.setData({
            quanlist: res.data.data
          })
        } else {
          console.log("获取优惠券列表失败")
        }
      }
    })
  },
  //获取已领取的优惠券
  getquanlist:function(){
    var that=this;

    //查询得到优惠券信息
    wx.request({
      url: requesturl + 'getGifCardListInbag',
      data: {
        openid: getApp().globalData.openID
      },
      header: {
        "Content-Type":"application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        console.log("获取优惠券列表:");
        console.log(res);

        if(res.data.code==0){
          that.setData({
            quanlist: res.data.data
          })
        }else{
          console.log("获取优惠券列表失败")
        }
      }
    })
  },
  //菜单的切换
  chktabmenu:function(e){
    var that=this;
    //参数部分
    var id=e.currentTarget.dataset.id;
    id=parseInt(id);

    that.setData({
      chkmenu:id
    })
    if(id==0){
      //获取所有的优惠券
      that.getnoquanlist();
    }else{
      //获取所有的优惠券
      that.getquanlist();
    }
  },
  //立即领取
  lingquopt:function(e){
    var that=this;

    //参数部分
    var id=e.currentTarget.dataset.id;
    var price = e.currentTarget.dataset.price;
    //更新券的状态
    wx.request({
      url: requesturl + 'gifCardIntoBag?openid=' + getApp().globalData.openID + "&cardId=" + id,
      data: {
      },
      header: {
        "Content-Type": "applictaion/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function (res) {
        console.log("更新优惠券列表:");
        console.log(res);

        if (res.data.code == 0) {
          //获取所有的优惠券
          that.getnoquanlist();
        } else {
          console.log("更新优惠券列表失败")
        }
      }
    })

  },
  //立即使用
  useopt:function(e){
    //参数部分
    var id = e.currentTarget.dataset.id;
    var price = e.currentTarget.dataset.price;
    
    getApp().globalData.quanid = id;
    getApp().globalData.quanprice = price;
    
    if (getApp().globalData.ischkquan){
      wx.navigateBack({
        delta:1
      })
      getApp().globalData.ischkquan=false;
    }else{
      wx.switchTab({
        url: '../index/index',
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