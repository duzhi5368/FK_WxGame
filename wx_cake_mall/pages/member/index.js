// pages/member/index.js
var requesturl = getApp().globalData.requesturl; //请求接口的地址

Page({

  /**
   * 页面的初始数据
   */
  data: {
    optlist: [], //选项列表
    chkid: 0, //选择的选项
    price: 0, //充值的钱
    sendprice: 0, //送的钱
    yue: 0, //账户余额
    paytype: 1, //充值对象
    cardId: "", //会员卡id
    cardno: '123  45678  721 ', //会员卡号
    cardowner: '卡券商户助手', //品牌名称
    cardbackimg: "http://img1.imgtn.bdimg.com/it/u=3574983150,2112436223&fm=26&gp=0.jpg", //会员卡背景图
    logoimg: "http://img3.imgtn.bdimg.com/it/u=4194156788,3290420958&fm=214&gp=0.jpg", //会员卡logo  
    title: "微信会员卡体验", //会员卡名称
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;

    //获取会员卡信息
    that.InitCard();
    //获取选列表
    that.getoptlist();
  },
  //获取会员卡信息
  InitCard: function() {

    //请求接口获取数据
    var that = this;

    //获取会员卡信息
    wx.request({
      url: requesturl + 'getUserMemberCardInfo',
      data: {
        openid: getApp().globalData.openID
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        console.log("会员卡信息:");
        console.log(res);

        if (res.data.code == 0) {
          that.setData({
            cardno: res.data.data.code, //会员卡号
            cardowner: res.data.data.brand_name, //卡品牌名称
            cardbackimg: res.data.data.background_pic_url, //会员卡背景图
            cardId: res.data.data.cardId, //卡id
            logoimg: res.data.data.logo_url, //Logo
            title: res.data.data.title, // 卡标题
            yue: res.data.data.balance, // 余额  
          })
        } else {
          console.log("获取数据失败!");
        }
      }
    })
  },
  //获取选列表
  getoptlist: function() {
    var that = this;

    wx.request({
      url: requesturl + 'getDenominationList',
      data: '',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        console.log("获取充值的列表:");
        console.log(res);

        if (res.data.code == 0) {
          that.setData({
            optlist: that.DealData(res.data.data)
          })
        } else {
          console.log("获取充值列表失败!");
        }
      }
    })

  },
  //重置数据的处理
  DealData: function(datalist) {
    var that = this;
    //重置列表数据
    var txtarry = [];

    for (var i = 0; i < datalist.length; i++) {
      txtarry[i] = {
        id: datalist[i].code,
        price: datalist[i].payAmount,
        send: datalist[i].giftAmount,
        ischk: false
      }
    }
    return txtarry;
  },
  //改变充值对象
  chkpaytype: function(e) {
    var that = this;
    //接受参数
    var id = e.currentTarget.dataset.id;
    id = parseInt(id);
    that.setData({
      paytype: id
    })
  },
  //获取充值卡号
  getcardno: function(e) {
    var that = this;
    //接受参数
    var txtval = e.detail.value;

    that.setData({
      cardno: txtval
    })
  },
  //选择支付的选项
  chkopt: function(e) {
    var that = this;

    //参数部分
    var id = e.currentTarget.dataset.id;
    id = parseInt(id);
    var chkid = 0; //选择的选项
    var price = 0; //充值的钱
    var sendprice = 0; //送的钱
    //充值数据
    var optlist = that.data.optlist;
    var txtarry = [];
    for (var i = 0; i < optlist.length; i++) {
      if (optlist[i].id == id) {
        txtarry[i] = {
          id: optlist[i].id,
          price: optlist[i].price,
          send: optlist[i].send,
          ischk: true
        }
        chkid = optlist[i].id; //选择的选项
        price = optlist[i].price; //充值的钱
        sendprice = optlist[i].send; //送的钱
      } else {
        txtarry[i] = {
          id: optlist[i].id,
          price: optlist[i].price,
          send: optlist[i].send,
          ischk: false
        }
      }
    }
    that.setData({
      optlist: txtarry, //选项列表
      chkid: chkid, //选择的选项
      price: price, //充值的钱
      sendprice: sendprice, //送的钱
    })
  },
  //立即支付
  payforopt: function() {
    var that = this;
    //参数部分
    var chkid = that.data.chkid; //选择的选项
    var price = that.data.price; //充值的钱
    var sendprice = that.data.sendprice; //送的钱
    var yue = that.data.yue; //账户余额
    var paytype = that.data.paytype; //充值对象
    var cardno = that.data.cardno; //充值卡号

    if (chkid == 0) {
      wx.showToast({
        title: '请选择充值项',
        mask: true,
        duration: 2000,
        icon: 'none'
      })
    } else if (paytype == 2 && cardno == "") {
      wx.showToast({
        title: '请选择充值卡号',
        mask: true,
        duration: 2000,
        icon: 'none'
      })
    } else {
      //自己支付
      if (paytype == 1) {        

        //提交支付请求，获取支付参数
        wx.request({
          url: requesturl + 'doMemberCardRecharge',
          data: {
            code: that.data.cardno,
            cardId: that.data.cardId,
            payAmount: price,
            giftAmount: sendprice,
            openid: getApp().globalData.openID
          },
          header: {
            "Content-Type":"application/x-www-form-urlencoded"
          },
          method: 'POST',
          success: function(res) {
            console.log("请求充值的结果:");
            console.log(res);

            if(res.data.code==0){
               that.DealOrder(res.data.data);
            }else{
              wx.showToast({
                title: res.data.msg,
                mask:true,
                icon:"none",
                duration:2000
              })
            }
          }
        })
      }
      //
    }
  },
  //提交订单，获取支付参数
  DealOrder:function(orderId){
    var that=this;
    var params = JSON.parse(orderId);
    //发起支付
    wx.requestPayment({
      timeStamp: params.timeStamp,
      nonceStr: params.nonceStr,
      package: params.package,
      signType: params.signType,
      paySign: params.paySign,
      success: function (res) {
        console.log("充值的结果:");
        console.log(res);

        if (res.errMsg == "requestPayment:ok") {
          wx.showToast({
            title: "充值成功",
            mask: true,
            duration: 2000
          })
          //获取会员卡信息
          that.InitCard();
        } else {
          wx.showToast({
            title: res.errMsg,
            mask: true,
            icon: "none",
            duration: 2000
          })
        }
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