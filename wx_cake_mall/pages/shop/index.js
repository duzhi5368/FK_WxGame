// pages/shop/index.js
var requesturl = getApp().globalData.requesturl; //请求接口的地址

Page({

  /**
   * 页面的初始数据
   */
  data: {
    jingdu: 0, //经度
    weidu: 0, //纬度
    scale: 14, //缩放比例
    controls: [{
      id: 1,
      iconPath: '/resources/dingwei.png',
      position: {
        left: 370,
        top: 250,
        width: 30,
        height: 30
      },
      clickable: true
    }], //缩放图标
    markers: [], //门店地址
    shoplist: [], //门店列表
    isnoshop:false,//没有门店数据
    shopid:"",//门店id
    name: "", //门店名称
    tel: "", //手机号码
    address: "", //地址
    nlat: 0,
    nlng: 0,
    slat: 0,
    slng: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;

    //初始化参数
    that.setData({
      shopid: options.shopid, //门店id
    })
    //获取经纬度
    that.InitCity();
  },
  //获取城市列表
  InitCity: function() {
    var that = this;

    //请求接口获取城市列表
    wx.getLocation({
      type: "gcj02",
      success: function(res) {
        //获取商品列表
        that.setData({
          jingdu: res.longitude, //经度
          weidu: res.latitude, //纬度
        })
      },
      fail: function() {
        wx.showToast({
          title: '请开发微信定位',
          mask: true,
          duration: 2000,
          icon: "none"
        })
        wx.navigateBack({
          delta: 1
        })
      },
    })
  },
  //缩放比例
  controltap: function() {
    var that = this;
    var scale = that.data.scale;
    scale = scale + 1 > 28 ? 28 : scale + 1;

    that.setData({
      scale: scale
    })
    //获取门店数据
    that.getshoplist();
  },
  //获取门店数据
  getshoplist: function() {
    var that = this;

    //参数部分     
    var nLat = that.data.nlat,
      nLng = that.data.nlng,
      sLat = that.data.slat,
      sLng = that.data.slng, //纬度
      scale = that.data.scale; //缩放比例

    //请求接口获取数据
    wx.request({
      url: requesturl + 'getStroeList',
      data: {
        nLat: nLat,
        nLng: nLng,
        sLat: sLat,
        sLng: sLng
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        console.log("获取门店列表数据:");
        console.log(res);

        if (res.data.code == 0) {
          that.setData({
            shoplist: res.data.data,
            isnoshop: res.data.data.length==0?true:false
          })
          //初始化地图makers
          that.InitMakers(res.data.data);
        } else {
          console.log("获取门店列表数据失败!");
        }
      }
    })
  },
  //初始化地图makers
  InitMakers: function(datalist) {
    var that = this;

    //参数部分
    var shopid = that.data.shopid; //地址

    //图坐标部分  
    var markers = [];
    var chkmapid=0;
    //循环赋值部分
    for (var i = 0; i < datalist.length; i++) {
      if (shopid == datalist[i].id) {

        markers[i] = {
          id: i,
          latitude: datalist[i].lat,
          longitude: datalist[i].lng,
          iconPath: '/resources/shopmaph.png'
        }
        chkmapid = i;
      } else {
        markers[i] = {
          id: i,
          latitude: datalist[i].lat,
          longitude: datalist[i].lng,
          iconPath: '/resources/shopmap.png'
        }
      }
    }
    console.log("图标的数据:");
    console.log(markers);
    //赋值部分
    that.setData({
      markers: markers
    })
    //更新门店列表
    that.updateshoplist(chkmapid);
  },
  //图标的显示
  markertap: function(e) {
    var that = this;
    //参数部分
    var chkmapid = e.markerId;

    //更新图标
    that.updatemaker(chkmapid);

    //更新门店列表
    that.updateshoplist(chkmapid);
  },
  //更新图标
  updatemaker: function(chkmapid) {
    var that = this;
    var markers = that.data.markers;
    var chkmapid = parseInt(chkmapid);
    //重置产品数据不符
    var markertxtarry = [];
    for (var i = 0; i < markers.length; i++) {
      if (chkmapid == markers[i].id) {
        markertxtarry[i] = {
          id: markers[i].id,
          latitude: markers[i].latitude,
          longitude: markers[i].longitude,
          iconPath: '/resources/shopmaph.png'
        };
      } else {
        markertxtarry[i] = {
          id: markers[i].id,
          latitude: markers[i].latitude,
          longitude: markers[i].longitude,
          iconPath: '/resources/shopmap.png'
        };
      }
    }
    //赋值部分
    that.setData({
      markers: markertxtarry, //坐标
    })
  },
  //获取选中的门店
  GetChkShop: function(shopid) {
    var that = this;

    var shoplist = that.data.shoplist;

    for (var i = 0; i < shoplist.length; i++) {
      if (shopid == i) {
        getApp().globalData.isshop = true;
        getApp().globalData.shopid = shoplist[i].id;//门店id
        getApp().globalData.shopname = shoplist[i].name; //店名
        getApp().globalData.shoptel = shoplist[i].tel; //店铺电话
        getApp().globalData.shopaddr = shoplist[i].address; //地址
      }
    }
  },
  //点选门店列表
  chkshop: function(e) {
    var that = this;
    //参数部分
    var id = e.currentTarget.dataset.id;

    //更新makers
    that.updatemaker(id);
    //更新门店列表
    that.updateshoplist(id);
  },
  //更新门店列表
  updateshoplist: function(id) {
    var that = this;

    //参数部分
    var shoplist = that.data.shoplist;
    //循环重置数据
    var txtarry = [];

    for (var i = 0; i < shoplist.length; i++) {
      if (i == id) {
        txtarry[i] = {
          address: shoplist[i].address,
          code: shoplist[i].code,
          id: shoplist[i].id,
          lat: shoplist[i].lat,
          lng: shoplist[i].lng,
          name: shoplist[i].name,
          tel: shoplist[i].tel,
          ischk: true
        }
      } else {
        txtarry[i] = {
          address: shoplist[i].address,
          code: shoplist[i].code,
          id: shoplist[i].id,
          lat: shoplist[i].lat,
          lng: shoplist[i].lng,
          name: shoplist[i].name,
          tel: shoplist[i].tel,
          ischk: false
        }
      }
    }
    console.log("重置门店列表:");
    console.log(txtarry);
    that.setData({
      shoplist: txtarry
    })
    //更新获取选中的门店
    that.GetChkShop(id);
  },
  //确定事件
  okopt: function() {
    var that = this;
    //返回前一页
    wx.navigateBack({
      delta:1
    })
  },
  //地图的改变
  regionchange:function(){
    var that=this;
    //获取地图的范围
    that.mapCtx.getRegion({
      success: function (res) {
        console.log("获取地图的范围");
        console.log(res);
        that.setData({
          nlat: res.northeast.latitude,
          nlng: res.northeast.longitude,
          slat: res.southwest.latitude,
          slng: res.southwest.longitude,
        })
        //获取门店列表
        that.getshoplist();
        wx.hideLoading();
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this;
    wx.showLoading({
      title: '数据加载中...',
      mask:true      
    })
    // 使用 wx.createMapContext 获取 map 上下文
    that.mapCtx = wx.createMapContext('myMap');
    setTimeout(function(){     
      that.mapCtx.getCenterLocation({
        success: function (res) {
          that.setData({
            jingdu: res.longitude, //经度
            weidu: res.latitude, //纬度
          })
        }
      })
      //获取地图的范围
      that.mapCtx.getRegion({
        success: function (res) {
          console.log("获取地图的范围");
          console.log(res);
          that.setData({
            nlat: res.northeast.latitude,
            nlng: res.northeast.longitude,
            slat: res.southwest.latitude,
            slng: res.southwest.longitude,
          })
          //获取门店列表
          that.getshoplist();
          wx.hideLoading();
        }
      })
    },2000)    
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