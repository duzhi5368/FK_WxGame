// pages/my/index.js
var requesturl = getApp().globalData.requesturl; //请求接口的地址
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menulist: [], //菜单部分
    ismember: true, //是否是会员
    cardId: "", //会员卡id
    cardno: ' ', //会员卡号
    cardowner: '', //品牌名称
    cardbackimg: "", //会员卡背景图
    logoimg: "", //会员卡logo  
    title: "", //会员卡名称
    memberurl: "", //领取会员卡
    quannum: 0, //优惠券个数
    yue: 0, //账户余额
    jifen: 0, //积分
    times: "", //营业时间
    phonenum: '', //服务电话
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.showLoading({
      title: '数据加载中...',
      mask: true
    })
  },
  //是否是会员
  ismember: function() {
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
            cardowner: res.data.data.brand_name, //卡名称
            cardbackimg: res.data.data.background_pic_url, //会员卡背景图
            cardId: res.data.data.cardId, //卡id
            logoimg: res.data.data.logo_url, //Logo
            title: res.data.data.title, // 卡标题
            jifen: res.data.data.bonus, //积分
            yue: res.data.data.balance, // 余额
            quannum: res.data.data.cardCount, //优惠券张数
            memberurl: res.data.data.getUrlCardId, //用户是否拥有会员卡
            ismember: res.data.data.getUrlCardId == "" ? true : false, //是否拥有会员卡            
          })
          //是否拥有会员卡
          getApp().globalData.ismember = res.data.getUrlCardId == "" ? true : false;
        } else {
          console.log("获取数据失败!");
        }
      }
    })
  },
  //配置信息
  initbaseinfo: function() {
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
          phonenum: res.data.data.phtone, //服务电话
          times: res.data.data.times //服务时间
        })

        //得到菜单列表
        that.getmenulist();

      }
    })
  },
  //激活会员卡
  jihuocard: function() {
    var that = this;
    //请求接口，获取新增的会员卡的值

    wx.request({
      url: requesturl + 'getAddCardObject',
      data: {
        cardId: that.data.memberurl
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        console.log("获取会员卡的信息:");
        console.log(res);

        if (res.data.code == 0) {

          //新增会员卡
          wx.addCard({
            cardList: res.data.data,
            success: function() {

            },
            fail: function() {

            }
          })
        }
      },
    })
  },
  //得到菜单列表
  getmenulist: function() {
    var that = this;
    //菜单列表
    var menulist = [{
        id: 1,
        icon: '/resources/dingdan.png',
        name: '我的订单',
        tip: '查看所有订单',
        url: '../order/index'
      },
      {
        id: 2,
        icon: '/resources/gouwuche.png',
        name: '购物车',
        tip: '',
        url: '../shopcart/index'
      },
      {
        id: 3,
        icon: '/resources/chongzhi.png',
        name: '会员充值',
        tip: '',
        url: '../member/index'
      },
      {
        id: 4,
        icon: '/resources/youhuiquan.png',
        name: '商城优惠券',
        tip: '',
        url: '../quan/index'
      },
      /*
      {
        id: 5,
        icon: '/resources/shoucang.png',
        name: '我的收藏',
        tip: '',
        url: '../shoucang/index'
      },
      */
      {
        id: 6,
        icon: '/resources/dizhi.png',
        name: '我的地址',
        tip: '',
        url: '../address/index'
      },
      {
        id: 7,
        icon: '/resources/phone.png',
        name: '服务电话:' + that.data.phonenum,
        tip: '',
        url: that.data.phonenum
      },
    ];

    that.setData({
      menulist: menulist
    })
    wx.hideLoading();
  },
  //点击菜单，页面的跳转
  gomenu: function(e) {
    var that = this;
    //接受参数
    var id = e.currentTarget.dataset.id;
    id = parseInt(id);
    var url = e.currentTarget.dataset.url;
    console.log("ID:" + id + ",url:" + url)
    if (id == 1 || id == 2) {
      wx.switchTab({
        url: url,
      })
    } else if (id == 7) { //服务电话
      wx.makePhoneCall({
        phoneNumber: url,
      })
    } else if (id == 3 && !that.data.ismember) {
      //领取会员卡
      that.jihuocard();
    } else {
      wx.navigateTo({ //其他的菜单
        url: url,
      })
    }
  },
  //优惠券
  goquan: function() {
    //得到优惠券
    wx.request({
      url: requesturl + 'getUserOtherCardList',
      data: {
        openid: getApp().globalData.openID
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        console.log("优惠券列表:");
        console.log(res);

        if (res.data.code == 0) {
          wx.openCard({
            cardList: res.data.data
          })
        } else {
          wx.showToast({
            title: '打开优惠券失败!',
            icon: 'none',
            duration: 2000,
            mask: true
          })
        }

      }
    })
  },
  //余额
  goyue: function() {
    wx.navigateTo({
      url: '../yue/index?cardno=' + this.data.cardno + "&cardId=" + this.data.cardId + "&yue=" + this.data.yue
    })
  },
  //积分
  gojifen: function() {
    wx.navigateTo({
      url: '../jifen/index?cardno=' + this.data.cardno + "&cardId=" + this.data.cardId + "&jifen=" + this.data.jifen,
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

    //是否是会员
    that.ismember();
    //配置信息
    that.initbaseinfo();
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