// pages/address/add.js
var requesturl = getApp().globalData.requesturl; //接口请求地址
var util = require('../../utils/util.js'); //地址工具
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '', //姓名/昵称
    sex: 1, //性别 1->男 2->女
    phone: '', //手机号
    address: '', //地址
    houseno: "",//门牌号
    isdefault: 1, //默认地址
    id: "", //地址id
    latitude: 0, //纬度
    longitude: 0, //经度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    console.log("传递的参数:");
    console.log(options);
    //接受参数
    that.setData({
      name: options.name, //姓名/昵称
      sex: options.sex, //性别 1->男 2->女
      phone: options.phone, //手机号
      address: options.address, //地址
      isdefault: options.isdefault, //默认地址
      id: options.id, //地址id
      houseno: options.houseno,//楼层门牌号
      latitude: parseFloat(options.latitude), //纬度
      longitude: parseFloat(options.longitude), //经度
      isdefault: parseInt(options.isdefault),//默认地址
    })
  },
  //姓名/昵称
  getname: function(e) {
    var that = this;
    //参数值
    var txtval = e.detail.value;

    that.setData({
      name: txtval
    })
  },
  //性别
  chksex: function(e) {
    var that = this;
    //参数值
    var id = e.currentTarget.dataset.id;

    that.setData({
      sex: parseInt(id)
    })
  },
  //手机号
  getphone: function(e) {
    var that = this;
    //参数值
    var txtval = e.detail.value;

    that.setData({
      phone: txtval
    })
  },
  //地图选址
  choosemap: function(e) {
    var that = this;

    //打开地址进行选址
    wx.chooseLocation({
      success: function(res) {
        that.setData({
          address: res.address,
          latitude: res.latitude,
          longitude: res.longitude
        })
      },
    })
  },
  //楼层门牌号
  gethouseno: function (e) {
    var that = this;
    //参数值
    var txtval = e.detail.value;

    that.setData({
      houseno: txtval
    })
  },
  //设置默认地址
  switchChange: function(e) {
    var ischk = e.detail.value;
    console.log("选择的地址:" + (ischk ? 1 : 0));
    var that = this;
    that.setData({
      isdefault: ischk ? 1 : 0
    })
  },
  //点击确定按钮
  saveopt: function() {
    var that = this;

    //参数部分
    var name = that.data.name; //姓名/昵称
    var sex = that.data.sex; //性别 1->男 2->女
    var phone = that.data.phone; //手机号
    var address = that.data.address; //地址
    var houseno = that.data.houseno; //门牌号
    var latitude = that.data.latitude; //纬度
    var longitude = that.data.longitude; //经度
    //验证必填项目
    if (name == "") {
      wx.showToast({
        title: '请输入姓名昵称',
        icon: 'none',
        mask: true,
        duration: 2000
      })
    } else if (phone == "") {
      wx.showToast({
        title: '请输入手机号码',
        icon: 'none',
        mask: true,
        duration: 2000
      })
    } else if (!util.validateMobile(phone)) {
      wx.showToast({
        title: '手机号码错误',
        icon: 'none',
        mask: true,
        duration: 2000
      })
    } else if (address == "") {
      wx.showToast({
        title: '点击选择地址',
        icon: 'none',
        mask: true,
        duration: 2000
      })
    } else if (houseno == "") {
      wx.showToast({
        title: '输入楼层门牌号',
        icon: 'none',
        mask: true,
        duration: 2000
      })
    }else {
      //参数的整理
      var params = {
        id: that.data.id,
        user: that.data.name,
        sex: that.data.sex,
        tel: that.data.phone,
        address: that.data.address,
        addressDetails:houseno,
        lng: longitude,
        lat: latitude,
        openid: getApp().globalData.openID,
        ifDefault: that.data.isdefault
      };
      //保存地址
      wx.request({
        url: requesturl + 'saveAddress',
        data: {
          strParam: JSON.stringify(params)
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        success: function(res) {
          console.log("地址的保存修改:");
          console.log(res);
          if (res.data.code == 0) {
            wx.showToast({
              title: '地址保存成功',
              mask: true,
              duration: 2000
            })
            wx.navigateBack({
              delta: 1
            })
          } else {
            wx.showToast({
              title: '地址保存失败',
              mask: true,
              duration: 2000,
              icon: 'none'
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