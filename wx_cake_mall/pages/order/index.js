// pages/order/index.js
var requesturl = getApp().globalData.requesturl; //请求的接口地址
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chkmenu: -1, //全部
    orderlist: [], //订单列表
    orderid: 0, //订单id
    showrefund: 'none', //显示退款
    refundtxt: '', //退款原因  
    pageNum: 1, //当前页码
  },
  //选中菜单
  chkmenu: function(e) {
    var that = this;
    //参数部分
    var id = e.currentTarget.dataset.id;
    id = parseInt(id);

    that.setData({
      chkmenu: id
    })
    //获取订单列表
    that.getorderlist();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;

    //获取订单列表
    that.getorderlist();
  },
  //获取订单列表
  getorderlist: function() {
    var that = this;
    //参数部分
    var id = that.data.chkmenu;
    var orderlist = that.data.orderlist;
    //查询获取订单
    wx.request({
      url: requesturl +'getOrderList',
      data: {
        page: 1,
        state: that.data.chkmenu,
        openid: getApp().globalData.openID
      },
      header: {
        "Content-Type":"application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        console.log("获取订单列表的数据:");
        console.log(res);

        if(res.data.code==0){
          orderlist = res.data.data;
        }
        //赋值部分
        that.setData({
          orderlist: orderlist
        })
      }
    }) 
   
  },
  //跳转到订单详情
  godetail: function(e) {
    var id = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: '../order/detail?id=' + id,
    })
  },
  //取消订单
  cancelopt: function(e) {
    var that = this;
    //参数部分
    var id = e.currentTarget.dataset.id;
  
   
    //请求删除订单
    wx.request({
      url: requesturl +'cancelOrder',
      data: {
        Id:id
      },
      header: {
        "Content-Type":"application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        console.log("请求取消订单:");
        console.log(res);
        if(res.data.code==0){
          wx.showToast({
            title: '取消订单成功',
            mask:true,
            duration:2000,            
          })
          //获取订单列表
          that.getorderlist();
        }
      }
    })  
    
  },
  //支付订单
  payforopt: function(e) {
    var that = this;
    //参数部分
    var id = e.currentTarget.dataset.id;

    //请求支付订单
    wx.request({
      url: requesturl+'doPay',
      data: {
        orderId:id
      },
      header: {
        "Content-Type":"application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        console.log("请求支付的接口:");
        console.log(res);
        
        if(res.data.code==0)
        {
          var payparams=JSON.parse(res.data.data);
          console.log("获取支付的参数:");
          console.log(payparams);
          //发起支付
          wx.requestPayment({
            timeStamp: payparams.timeStamp,
            nonceStr: payparams.nonceStr,
            package: payparams.package,
            signType: payparams.signType,
            paySign: payparams.paySign,
            complete:function(){
              //获取订单列表
              that.getorderlist();
            },
          })
        }       
      }
    })
  },
  //退款操作
  refundopt: function(e) {
    var that = this;
    //参数部分
    var id = e.currentTarget.dataset.id;
    

    that.setData({
      orderid: id, //订单id
      showrefund: 'block', //显示退款
      refundtxt:""
    })
  },
  //关闭退款
  hiderefund: function() {
    this.setData({
      showrefund: 'none', //显示退款
      refundtxt:""
    })
  },
  //获取退款的原因
  getrefund: function(e) {
    var that = this;
    //获取参数
    var txtval = e.detail.value;
    that.setData({
      refundtxt: txtval
    })
  },
  //退款的确定
  refundok: function() {
    var that = this;
    //参数部分
    var id = that.data.orderid; //订单id
    var refundtxt = that.data.refundtxt; //退款原因

    //验证必填项
    if (refundtxt == "") {
      wx.showToast({
        title: '请输入原因',
        duration: 2000,
        mask: true,
        icon: 'none'
      })
    } else {
      //更改订单的状态
      wx.request({
        url: requesturl+'refundOrder',
        data: {
          id: id,
          reson: refundtxt
        },
        header: {
          "Content-Type":"application/x-www-form-urlencoded"
        },
        method: 'POST',
        success: function(res) {
          console.log("发起退款操作:");
          console.log(res);

          if(res.data.code==0){

            that.setData({
              showrefund: 'none',
              refundtxt:""
            })
            //获取订单列表
            that.getorderlist();
          }else{
            wx.showToast({
              title: '退款申请失败',
              mask:true,
              duration:2000,
              icon:'icon'
            })
          }
        }
      })
    
    }
  },
  
  //验收操作
  yanshoupt:function(e){
    var that=this;
    //参数部分
    var id=e.currentTarget.dataset.id;

    //请求验收接口
    wx.request({
      url: requesturl +'receiveOrder',
      data: {
        Id:id
      },
      header: {
        "Content-Type":"application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        console.log("请求验收的结果:");
        console.log(res);

        if(res.data.code==0){
          wx.showToast({
            title: '验收成功',
            duration: 2000,
            mask: true
          })
        }
      }
    })
    //获取订单列表
    that.getorderlist();
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
    var that = this;
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var pageNum =1;
    that.setData({
      pageNum: pageNum
    })
    //获取订单列表
    that.getdownorderlist();

    // 隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();
  },
  //下滑
  getdownorderlist: function () {
    var that = this;
    // 显示顶部刷新图标
    //wx.showNavigationBarLoading();

    //获取订单列表
    that.getorderlist();
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
    var pageNum =1;
    that.setData({
      pageNum: pageNum
    })
    //获取订单列表
    that.getuporderlist();
  },
 
  //上拉下滑
  getuporderlist:function(){
    var that=this;
    //查询获取订单
    wx.request({
      url: requesturl + 'getOrderList',
      data: {
        page: that.data.pageNum+1,
        state: that.data.chkmenu,
        openid: getApp().globalData.openID
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function (res) {
        console.log("获取订单列表的数据:");
        console.log(res);
        var orderlist = that.data.orderlist;
        if (res.data.code == 0) {
          var newlist = res.data.data
          orderlist = orderlist.concat(newlist);
        }
        //赋值部分
        that.setData({
          orderlist: orderlist
        })
      }
    }) 
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})