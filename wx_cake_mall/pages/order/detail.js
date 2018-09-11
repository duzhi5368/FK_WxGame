
// pages/order/detail.js
var util = require('../../utils/util.js'); //订单测试数据
var requesturl = getApp().globalData.requesturl; //请求接口获取参数
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "", //订单id
    chkmenuv: 2, //选中的菜单
    status: 0, //订单状态
    bookdt: '', //提交订单的时间
    payfordt: '', //支付时间
    sendname: '', //送货人
    sendt: '', //送货时间
    /***订单的信息***/
    orderNo: "", //订单号
    orderTime: "", //下单时间
    payType: 1, //支付方式
    sendType: 1, //送货方式
    user: "", //收货人姓名
    address: "", //收货人地址
    tel: "", //收货人联系方式
    cakelist: [], //购买的商品
    /**钱部分**/
    sumprice: 0, //商品合计金额
    youhui: 0, //优惠钱
    yunfee: 0, //运费
    payfor: 0, //支付钱
    refReason: "", //退款原因
    /**基本信息部分**/
    callphone: '', //联系电话
    times: "", //营业时间段
    paytype: 2, //支付的方式
    yue: 0, //会员卡余额
    /**评价的内容**/
    goodsid:"",//评价产品id
    showpingjia: 'none', //显示评价
    pingjiatxt: '', //评价内容
    /**门店信息**/
    storeName:"",//门店名称
    storeAddress:"",//门店地址
    storeTel:"",//门店电话
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;

    //接受参数
    that.setData({
      id: options.id
    })
    //获取订单的信息
    that.orderinfo();
    //获取商铺基本信息
    that.baseinfo();
  },
  //商铺基本信息
  baseinfo: function() {
    var that = this;
    //获取配置信息
    wx.request({
      url: requesturl + 'getOptionInfo',
      data: '',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        console.log("获取配置信息的数据:");
        console.log(res);

        that.setData({
          callphone: res.data.data.phtone, //服务电话
          times: res.data.data.times //服务时间
        })
      }
    })
  },
  //获取订单的信息
  orderinfo: function() {
    var that = this;
    //参数部分
    var id = that.data.id;

    //查询获取参数
    wx.request({
      url: requesturl + 'getOrderInfo',
      data: {
        orderId: id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        console.log("获取订单详情数据:");
        console.log(res);

        if (res.data.code == 0) {
          that.setData({
            bookdt: res.data.data.orderTime, //下单时间
            orderNo: res.data.data.orderNum, //订单号
            payType: res.data.data.payType, //支付方式
            sendType: res.data.data.sendType, //送货方式
            status: res.data.data.state, //送货方式
            sendDate: res.data.data.sendDate, //送货日期
            sendTime: res.data.data.sendTime, //送货日期
            user: res.data.data.user, //收货人姓名
            address: res.data.data.address, //收货人地址
            tel: res.data.data.tel, //收货人联系方式
            cakelist: res.data.data.productList, //购买的产品
            refReason: res.data.data.refReson, //退款原因
            /***钱部分***/
            sumprice: res.data.data.fsum, //金额
            youhui: res.data.data.cutFsum, //优惠
            yunfee: res.data.data.freight, //运费
            payfor: res.data.data.payFsum, //支付钱
            /***到店自提部分***/
            storeName: res.data.data.storeName,//门店名称
            storeAddress: res.data.data.storeAddress,//门店地址
            storeTel: res.data.data.storeTel,//门店电话
          })
        }
      }
    })
  },
  //菜单的选中
  chkmenu: function(e) {
    var that = this;
    //接受参数
    var id = e.currentTarget.dataset.id;
    id = parseInt(id);

    that.setData({
      chkmenuv: id
    })
  },
  //拨打电话
  callphone: function() {
    var that = this;

    wx.makePhoneCall({
      phoneNumber: that.data.callphone,
    })
  },
  //门店电话
  phoneopt:function(e){
    var that=this;
    //参数部分
    var phone=e.currentTarget.dataset.phone;
    
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },
  //选择支付的方式
  chksend: function(e) {
    var that = this;
    //接受参数
    var id = e.currentTarget.dataset.id;

    id = parseInt(id);
    that.setData({
      paytype: id
    })
  },
  //支付按钮
  payforopt: function() {
    var that = this;

    //参数部分
    var paytype = that.data.paytype; //支付的方式
    var yue = that.data.yue; //会员卡余额
    var amount = that.data.amount; //支付钱

    if (paytype == 1 && amount > yue) {
      wx.showToast({
        title: '余额不足，无法支付',
        mask: true,
        duration: 2000,
        icon: 'none'
      })
    } else {
      //发起支付
      var that = this;
      //参数部分
      var id = that.data.id;

      //请求支付订单
      wx.request({
        url: requesturl + 'doPay',
        data: {
          orderId: id
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        success: function(res) {
          console.log("请求支付的接口:");
          console.log(res);

          if (res.data.code == 0) {
            var payparams = JSON.parse(res.data.data);
            console.log("获取支付的参数:");
            console.log(payparams);
            //发起支付
            wx.requestPayment({
              timeStamp: payparams.timeStamp,
              nonceStr: payparams.nonceStr,
              package: payparams.package,
              signType: payparams.signType,
              paySign: payparams.paySign,
              complete: function() {
                //获取订单的信息
                that.orderinfo();
                //获取商铺基本信息
                that.baseinfo();
              },
            })
          }
        }
      })
    }
  },
  //去评价操作
  pingjiaopt: function (e) {
    var that = this;
    //参数部分
    var id = e.currentTarget.dataset.id;
    that.setData({
      goodsid: id, //产品id
      showpingjia: 'block', //显示退款
      pingjiatxt:""
    })
  },
  //关闭去评价
  hidepingjia: function () {
    this.setData({
      showpingjia: 'none', //显示退款z
      pingjiatxt:""
    })
  },
  //获取评价的原因
  getpingjia: function (e) {
    var that = this;
    //获取参数
    var txtval = e.detail.value;
    that.setData({
      pingjiatxt: txtval
    })
  },
  //评价的确定
  pingjiaok: function () {
    var that = this;
    //参数部分
    var id = that.data.goodsid; //产品id
    var orderpid = that.data.orderpid;//订单产品id    
    var pingjiatxt = that.data.pingjiatxt; //评价内容

    //验证必填项
    if (pingjiatxt == "") {
      wx.showToast({
        title: '请输入评价',
        duration: 2000,
        mask: true,
        icon: 'none'
      })
    } else {
      //更改订单的状态
      wx.request({
        url: requesturl + 'saveRate',
        data: {
          orderProductId: orderpid,
          strParam: JSON.stringify({
            contentInfo: pingjiatxt,
            productId: id,//商品id
            openid: getApp().globalData.openID
          })
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        success: function (res) {
          console.log("请求保存评价的结果:");
          console.log(res);

          if (res.data.code == 0) {
            wx.showToast({
              title: '保存评价成功',
              mask: true,
              duration: 2000
            })
            that.setData({
              showpingjia: 'none',
              pingjiatxt:""
            })
          }
        }
      })      
    }
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