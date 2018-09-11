//index.js
var requesturl = getApp().globalData.requesturl; //请求接口的地址

//获取应用实例
const app = getApp()

Page({
  data: {
    mode: "scaleToFill",
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    imglist: [], //轮播图
    currentTab: 0, //预设当前项的值
    typeid: '0', //分类id
    scrollLeft: 0, //tab标题的滚动条位置
    menulist: [], //菜单列表
    cakelist: [], //蛋糕列表
    tianlist: [0, 1, 2, 3, 4], //甜度列表
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //页面的初始化
  onLoad: function (options) {
    var params = options;
    params=JSON.stringify(params);
    if (params== '{}') {
      console.log(params);
    }else{
      //进入我的页面
      if (options.item==1){
        wx.switchTab({
          url: '../my/index',
        })
      }
    }
  },
  //轮播图
  getswiper: function() {
    var that = this;

    //请求接口，得到顶部轮播图
    wx.request({
      url: requesturl + 'getTopProductInfoList',
      data: '',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        console.log("轮播图数据：");
        console.log(res);

        if (res.data.code == 0) {
          that.setData({
            imglist: res.data.data
          })
        }
      }
    })
  },
  //点击轮播图
  gointro: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../goods/index?id=' + id
    })
  },
  //菜单部分
  getmenu: function() {

    var that = this;

    var menulist = [{
      id: "0",
      name: '全部',
    }, ];
    that.setData({
      menulist: menulist
    })

    //请求接口得到数据
    wx.request({
      url: requesturl + 'getSaleProductType',
      data: '',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        console.log("分类数据:");
        console.log(res);

        if (res.data.code == 0) {
          menulist = menulist.concat(res.data.data);
          that.setData({
            menulist: menulist
          })
        }
      }
    })
    //得到蛋糕
    that.getcakelist();
    //结束标识符
  },
  // 点击标题切换当前页时改变样式
  swichNav: function(e) {
    var that = this;
    var cur = e.target.dataset.current;
    var id = e.target.dataset.id;
    console.log("点击的菜单:");
    console.log(e);
    if (that.data.currentTab == cur) {
      return false;
    } else {
      that.setData({
        currentTab: parseInt(cur),
        typeid: id
      })
      that.checkCor();
    }
    //获取蛋糕列表
    that.getcakelist();
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function() {
    var that = this;
    if (that.data.currentTab > 3) {
      var num = parseInt(that.data.currentTab / 3);
      that.setData({
        scrollLeft: 150 * num
      })
    } else {
      that.setData({
        scrollLeft: 0
      })
    }
  },
  //获取蛋糕列表
  getcakelist: function() {
    var that = this;
    //得到当前选中的菜单
    var chkid = that.data.typeid;
    console.log("选择的类型:" + chkid);
    //得到对应的产品列表
    wx.request({
      url: requesturl + 'getSaleProductList',
      data: {
        typeId: chkid,
        page: 1
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        console.log("产品列表:");
        console.log(res);

        if (res.data.code == 0) {
          that.setData({
            cakelist: res.data.data
          })
        }
      }
    })

    //结束标识符
  },
  //跳转到详情页面
  godetail: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../goods/index?id=' + id,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;

    wx.showLoading({
      title: '页面正在加载中....',
    })
    

    if (getApp().globalData.openid == "") {
      //优先登录
      setTimeout(function() {
        //轮播图
        that.getswiper();
        //菜单部分
        that.getmenu();
        wx.hideLoading();
      }, 2000)
    } else {
      wx.hideLoading();
    }
  }
})