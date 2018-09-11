// pages/address/index.js
var requesturl = getApp().globalData.requesturl; //接口请求地址
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addresslist: [], //地址列表    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  //得到地址列表数据
  getdatalist: function() {
    var that = this;

    //查询获取地址列表
    wx.request({
      url: requesturl + 'getReceiverAddressList',
      data: {
        openid: getApp().globalData.openID
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        console.log("获取地址列表:");
        console.log(res);

        if (res.data.code == 0) {
          //赋值部分
          that.setData({
            addresslist: res.data.data
          })
        }
      }
    })

  },
  //新增地址
  adddizhi: function() {
    var that = this;

    wx.navigateTo({
      url: "../address/add?id=&name=&sex=1&phone=&address=&houseno=&latitude=0&longitude=0&isdefault=0",
    })
  },
  //编辑地址
  editopt: function(e) {
    var that = this;
    //参数部分
    var id = e.currentTarget.dataset.id;
    var name = e.currentTarget.dataset.name;
    var sex = parseInt(e.currentTarget.dataset.sex);
    var phone = e.currentTarget.dataset.phone;
    var address = e.currentTarget.dataset.address;
    var houseno = e.currentTarget.dataset.houseno;
    var latitude = e.currentTarget.dataset.latitude;
    var longitude = e.currentTarget.dataset.longitude;
    var isdefault = e.currentTarget.dataset.isdefault;
    //查询得到地址信息
    wx.navigateTo({
      url: '../address/add?id=' + id + "&name=" + name + "&sex=" + sex + "&phone=" + phone +"&address=" + address 
      + "&houseno=" + houseno + "&latitude=" + latitude + "&longitude=" + longitude + "&isdefault=" + isdefault
    })
  },
  //删除地址
  delopt: function(e) {
    var that = this;
    //参数部分
    var id = e.currentTarget.dataset.id;
    var isdefault = e.currentTarget.dataset.ismoren;
    isdefault = parseInt(isdefault);

    //弹窗提示
    wx.showModal({
      title: '删除',
      content: '确定删除吗?',
      success: function(res) {
        //点击确定按钮
        if (res.confirm) {
          if (isdefault == 1) { //默认地址无法删除
            //弹窗提示
            wx.showModal({
              title: '错误',
              content: '默认地址无法删除',
              showCancel: false,
              confirmText: '我知道了',
              confirmColor: "#ffd161",
            })
          } else { //删除数据
            wx.request({
              url: requesturl + 'deleteAddress',
              data: {
                Id: id
              },
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              method: 'POST',
              success: function(res) {
                console.log("删除地址结果:");
                console.log(res);

                if (res.data.code == 0) {
                  wx.showToast({
                    title: '删除成功',
                    duration: 2000,
                    mask: true
                  })

                  //查询获取地址列表
                  that.getdatalist();
                } else {
                  wx.showToast({
                    title: '删除失败',
                    icon: 'none',
                    duration: 2000,
                    mask: true
                  })
                }
              }
            });
          }
        } else if (res.cancel) {
          console.log("点击取消");
        }
      }
    })
 
  },
  //设成成默认地址
  setdefault: function(e) {
    var that = this;
    //参数部分
    var id = e.currentTarget.dataset.id;
    //设置默认地址
    wx.request({
      url: requesturl +'setDefaultAddress',
      data: {
        id:id
      },
      header: {
        "Content-Type":"application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        console.log("设置成默认地址");
        console.log(res);

        if(res.data.code==0){
           wx.showToast({
             title: '设置成功',
             duration:2000,
             mask:true             
           })
        }else{
          wx.showToast({
            title: '设置失败',
            duration: 2000,
            mask: true,
            icon:"none"
          })
        }
        //得到地址列表数据
        that.getdatalist();
      }
    })

  },
  //点击底部的确定按钮
  okopt: function() {
    var that = this;

    wx.navigateBack({
      delta: 1
    })
  },
  //选择地址
  chkaddressopt: function(e) {
    var that = this;
    //参数部分
    var id = e.currentTarget.dataset.id;
    var name = e.currentTarget.dataset.name;
    var sex = parseInt(e.currentTarget.dataset.sex);
    var phone = e.currentTarget.dataset.phone;
    var address = e.currentTarget.dataset.address + e.currentTarget.dataset.houseno;
    var lat = e.currentTarget.dataset.lat;
    var lng = e.currentTarget.dataset.lng;
    var yunfee = e.currentTarget.dataset.yunfee;
    //赋值

    getApp().globalData.addressid = id; //地址id
    getApp().globalData.addressuser = name; //地址人
    getApp().globalData.addresstel = phone; //地址电话
    getApp().globalData.addresstxt = address; //地址内容
    getApp().globalData.addresssex = sex; //地址性别
    getApp().globalData.addresslat = lat;//地址纬度
    getApp().globalData.addresslng = lng;//地址经度
    getApp().globalData.yunfee = parseFloat(yunfee);//地址经度
    wx.navigateBack({
      delta: 1
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

    //得到地址列表数据
    that.getdatalist();
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