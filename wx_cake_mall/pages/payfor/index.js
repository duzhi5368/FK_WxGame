// pages/payfor/index.js
var timetool = require('../../utils/util.js'); //地址工具
var requesturl = getApp().globalData.requesturl; //请求接口的地址
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gid: 0, //商品id
    name: '', //商品名称
    amount: 0, //商品的总价
    price: 0, //商品单价
    bangnum: '', //购买的规格
    buynum: 0, //购买的数量
    paitxt: '', //生日牌
    gtu: '', //商品图
    //地址信息
    addressid: 0,
    concator: '', //联系人
    phone: '', //手机号
    address: '', //地址
    isdefault: false, //默认地址
    sex: "", //性别
    lat:0,//纬度
    lng:0,//经度
    //时间部分
    date: '', //配送日期
    sendtime: '', //配送时间
    //金钱部分
    quanid:"",//优惠券id
    quanprice: 0, //券价格
    yunfee: 0, //运费
    payfor: 0, //付费
    //配送方式
    sendtype: 1, //配送方式：1->店家配送 2->自提
    isshop:false,
    shopid: "",//门店id
    shopname:"",//店名
    shoptel:"",//店铺电话
    shopaddr:"",//地址
    //选择时间段
    hidden: true,
    sendtimelist: [], //配送时间段    
    orderid:"",//订单id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    console.log("接受的参数值:");
    console.log(options);
    //接受参数
    that.setData({
      gid: options.gid,
      name: options.name,
      amount: (parseFloat(options.price) * parseInt(options.buynum)).toFixed(2),
      price: parseFloat(options.price),
      bangnum: options.bangnum,
      buynum: parseInt(options.buynum),
      paitxt: options.paitxt,
      gtu: options.gtu,
      payfor:(parseFloat(options.price) * parseInt(options.buynum)).toFixed(2)
    })


    //默认时间部分
    that.inittime();
    //配送时间部分
    that.initsendtime();
  },
  //地址部分
  initaddress: function() {
    var that = this;
    //地址的参数
    var addressid = getApp().globalData.addressid; //地址id
    var addressuser = getApp().globalData.addressuser; //地址人
    var addresstel = getApp().globalData.addresstel; //地址电话
    var addresstxt = getApp().globalData.addresstxt; //地址内容
    var addresssex = getApp().globalData.addresssex; //地址性别
    var addresslat = getApp().globalData.addresslat; //地址纬度
    var addresslng= getApp().globalData.addresslng; //地址经度
    //赋值部分
    that.setData({
      addressid: addressid == "" ? "" : addressid,//地址id
      concator: addressid == "" ? "" : addressuser, //联系人
      phone: addressid == "" ? "" : addresstel, //手机号
      sex: addressid == "" ? "" : addresssex, //地址性别
      address: addressid == "" ? "" : addresstxt, //地址
      isdefault: addressid == "" ? false : true, //默认地址
      lat: addressid == "" ? 0 : parseFloat(addresslat),//纬度
      lng: addressid == "" ? 0 : parseFloat(addresslng),//经度
      yunfee: addressid == "" ? 0 : parseFloat(getApp().globalData.yunfee),//运费
    })
    //计算总计
    that.suansumprice();
  },
  //默认时间部分
  inittime: function() {
    var that = this;

    that.setData({
      date: timetool.todayTime(1)
    })
  },
  //配送时间部分
  initsendtime: function() {
    var that = this;

    that.setData({
      sendtimelist: timetool.sendTime(1)
    })
  },
  //日期的改变
  getdate: function(e) {
    var that = this;
    console.log("选择的日期:");
    console.log(e);
    that.setData({
      date: e.detail.value
    })
  },
  //弹窗选择时间段
  getsendtime: function() {
    this.setData({
      hidden: false
    })
  },
  //选择时间段
  chksendtime: function(e) {
    var that = this;
    //得到参数
    var start = e.currentTarget.dataset.start;
    var end = e.currentTarget.dataset.end;
    var status = e.currentTarget.dataset.status;
    status = parseInt(status);

    if (status == 1) {
      that.setData({
        sendtime: start + ":00~" + end + ":00",
        hidden: true
      })
    } else {
      wx.showToast({
        title: '选择明天时间段配送',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    }
  },
  //点击关闭
  hideopt: function() {
    this.setData({
      hidden: true
    })
  },
  //选择地址
  chkaddress: function() {
    var that = this;
    //跳转到地址管理
    wx.navigateTo({
      url: '../address/index',
    })
  },
  //选择配送的方式
  chksend: function(e) {
    var that = this;
    //参数部分
    var id = e.currentTarget.dataset.id;
    id=parseInt(id);
    if (id==1){
      that.setData({
        isshop: false,
        shopid: "",//门店id
        shopname: "",//店名
        shoptel: "",//店铺电话
        shopaddr: "",//地址
      })
    }
    that.setData({
      sendtype:id
    })
  },
  //自取门店
  gochkshop: function () {
    var that=this;
    //跳转到自取门店页面
    wx.navigateTo({
      url: '../shop/index?shopid=' + that.data.shopid
    })
  },
  //选择优惠券
  goquan:function(){
    var that=this;
    getApp().globalData.ischkquan = true;
    wx.navigateTo({
      url: '../quan/chkopt?sumprice=' + that.data.payfor,
    })
  },  
  //提交订单
  postorder: function() {
    var that = this;
   
    //验证必填项
    var addressid = that.data.addressid;
    var sendtime = that.data.sendtime;

    if (addressid == 0) {
      wx.showToast({
        title: '请选择收货地址',
        icon: 'none',
        mask: true,
        duration: 2000
      })
    } else if (sendtime == "") {
      wx.showToast({
        title: '请选择配送时间段',
        icon: 'none',
        mask: true,
        duration: 2000
      })
    } else if (that.data.sendtype == 2&&that.data.shopid=="") {
      wx.showToast({
        title: '请选择提取门店',
        icon: 'none',
        mask: true,
        duration: 2000
      })
    } else {
      wx.showLoading({
        title: '正在提交订单',
        mask:true,                
      })
      //提交订单参数
      var params = {
        address: that.data.address,//地址
        user: that.data.concator,//姓名
        tel: that.data.phone,//手机号
        sex: that.data.sex==1?"男":"女",//性别
        sendDate: that.data.date,//配送日期
        sendTime: that.data.sendtime,//配送时间段
        sendType: that.data.sendtype == 1 ? "店家配送" :"到店自提",//配送方式
        fsum: parseFloat(that.data.amount) ,//商品金额
        payFsum: parseFloat(that.data.payfor),//支付金额
        cutFsum: parseFloat(that.data.quanprice),//优惠金额
        freight: parseFloat(that.data.yunfee),//运费
        openid: getApp().globalData.openID,
        stroeId: that.data.sendtype == 1 ? "" : that.data.shopid,
        productList: [{
          id: that.data.gid, //商品id
          price: parseFloat(that.data.price),//商品单价
          fAmount: parseInt(that.data.buynum),//商品数量
          remark: that.data.paitxt,//备注
          name: that.data.name,//商品名称
          spec: that.data.bangnum,//购买规格
          fsum: parseFloat(that.data.price) * parseInt(that.data.buynum),//小计
        }]
      };

      
      //提交订单
      wx.request({
        url: requesturl +'submitOrder',
        data:{
          gifCardId: that.data.quanid,//优惠券
          cartIds: "",//订单id
          strParam: JSON.stringify(params)
        },
        header: {
          "Content-Type":"application/x-www-form-urlencoded"
        },
        method: 'POST',
        success: function(res) {
          console.log("提交订单结果:");
          console.log(res);

          if(res.data.code==0)
          {
            wx.showToast({
              title: '订单提交成功',
              mask: true,
              duration: 2000
            })
            that.setData({
              orderid:res.data.data
            })
            //发起支付
            that.payforopt();
          }else{
            wx.showToast({
              title: '订单提交失败',
              icon: 'none',
              mask: true,
              duration: 2000
            })
          }
        }
      })
      //结束标识符
    }
  },
  //发起支付
  payforopt:function(){
    var that=this;
    //支付部分
    wx.request({
      url: requesturl +'doPay',
      data: {
        orderId: that.data.orderid
      },
      header: {
        "Content-Type":"application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        console.log("获取支付的接口参数");
        console.log(res);

        if(res.data.code==0)
        {
          var params = JSON.parse(res.data.data) ;
          wx.requestPayment({
            timeStamp: params.timeStamp,
            nonceStr: params.nonceStr,
            package: params.package,
            signType: params.signType,
            paySign: params.paySign,
            complete:function(){
              //支付成功，跳转到订单页面
              wx.switchTab({
                url: '../order/index',
              })
            },
          })

          //结束标示
          wx.hideLoading();
        } else {
          console.log("发起支付失败");

          //结束标示
          wx.hideLoading();
        }
        //重置选择地址的数据
        getApp().globalData.addressid = '';//地址id
        getApp().globalData.addressuser = '';//地址人
        getApp().globalData.addresstel = '';//地址电话
        getApp().globalData.addresstxt = '';//地址内容
        getApp().globalData.addresssex = '';//地址性别
        getApp().globalData.addresslat = 0;//地址纬度
        getApp().globalData.addresslng = 0;//地址经度
        getApp().globalData.yunfee = 0;//运费

        //重置优惠券
        getApp().globalData.quanid = "";
        getApp().globalData.quanprice = 0; 

        //重置门店自提
        getApp().globalData.isshop = false;
        getApp().globalData.shopid="";
        getApp().globalData.shopname = ""; 
        getApp().globalData.shopaddr = ""; 
        getApp().globalData.shoptel="";
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
    var that = this;
    //地址部分
    that.initaddress();
    //获取优惠券的钱
    that.initquan();
    //获取自取门店
    that.initshop();
  },
  //获取优惠券的钱
  initquan:function(){
    var that = this;
    //计算运费的参数
    var quanid = getApp().globalData.quanid; //地址id
    var quanprice = getApp().globalData.quanprice; //地址内容
    console.log("优惠券id" + quanid + ",券价格:" + quanprice);
    that.setData({
      quanid: quanid,
      quanprice: quanprice
    })
    //计算总计
    that.suansumprice();
  },
  //价格的改变，修改支付总价
  suansumprice:function(){
    var that=this;
    //计算总价的参数
    var amount = that.data.amount;//商品的价格
    var quanprice = that.data.quanprice;//优惠券
    var yunfee = that.data.yunfee;//运费
    //计算公式
    var payfor = amount - quanprice + yunfee;
    payfor = payfor.toFixed(2);
    that.setData({
      payfor: payfor
    })
  },
  //获取自取门店
  initshop:function(){
    var that=this;
    
    var isshop = getApp().globalData.isshop,
      shopid = getApp().globalData.shopid,//门店id
      shopname = getApp().globalData.shopname,//店名
      shoptel = getApp().globalData.shoptel,//店铺电话
      shopaddr = getApp().globalData.shopaddr;//地址
    that.setData({
      isshop: isshop,
      shopid:shopid,
      shopname: shopname,
      shopaddr:shopaddr,
      shoptel: shoptel
    })  
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