// pages/goods/index.js
var requesturl = getApp().globalData.requesturl; //接口请求的参数
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0, //商品id
    name: '', //商品的名称
    price: '', //价格
    specname: '', //规格
    desc: '', //描述
    /*轮播图参数部分*/
    mode: "scaleToFill",
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    imglist: [], //轮播图  
    /*展示部分*/
    chkmenu: 0, //选中的菜单
    menulist: [], //菜单选中操作
    infoimgList: [], //详情内容
    tuijianlist: [], //推荐列表
    pinglunlist: [], //评论列表
    /*预定选购部分*/
    default_spe_img: '', //默认产品图
    num: 1, //初始数量
    amount: 0, //初始金额
    minusStatus: 'disabled',
    // 使用data数据对象设置样式名
    choose_modal: "none",
    //规格数据
    spec: [{
      id: 1,
      name: "规格",
      child: []
    }],
    paitxt: '', //生日牌
    selectName: "", //已选的属性名字
    selectAttrid: "", //选择的属性id
    danjia: 0, //单价
    iszan: false, //是否点赞
    iscollect: false, //是否收藏
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //接收参数
    that.setData({
      id: options.id, //商品id
    })

    //得到商品的详情
    that.getgoodsinfo();


    //得到菜单状态
    that.getmenulist();

    //推荐商品
    that.recommentprolist();

    //评价列表
    that.pingjialist();
  },
  //得到商品的详情
  getgoodsinfo: function() {
    var that = this;
    //参数部分
    var id = that.data.id;

    //查询得到商品
    wx.request({
      url: requesturl + 'getSaleProductInfoById',
      data: {
        productId: id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        console.log("接口商品详情:");
        console.log(res);
        if (res.data.code == 0) {
          var goods = res.data.data[0];
          console.log("商品详情:");
          console.log(goods);
          var guige = goods.spec

          that.setData({
            name: goods.name, //商品的名称
            price: goods.price, //价格
            specname: goods.spec, //规格
            desc: goods.description_short, //描述           
            default_spe_img: goods.pic, //默认图
            selectName: goods.spec, //已选的属性名字
            selectAttrid: goods.product_spec_id, //选择的属性id  
            danjia: goods.price, //价格     
            /*轮播图参数部分*/
            imglist: [goods.pic], //轮播图 
            infoimgList: goods.imgList, //详情图
          })

          //初始化选择规格数量
          that.initSpec();
        }
      }
    })

  },
  //得到菜单状态
  getmenulist: function() {
    var that = this;
    //菜单部分
    var menulist = [{
        id: 1,
        name: '详情'
      },
      {
        id: 2,
        name: '推荐'
      },
      {
        id: 3,
        name: '评论'
      },
    ];

    that.setData({
      chkmenu: 1, //选中的菜单
      menulist: menulist, //菜单选中操作
    })
  },
  //推荐商品
  recommentprolist: function() {
    var that = this;

    //推荐商品
    wx.request({
      url: requesturl + 'getRecommendProductList',
      data: {
        productId: that.data.id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencode"
      },
      method: 'POST',
      success: function(res) {
        console.log("获取推荐商品列表:");
        console.log(res);

        if (res.data.code == 0) {
          that.setData({
            tuijianlist: res.data.data
          })
        }

      }
    })
  },
  //商品评论
  pingjialist: function() {
    var that = this;

    //推荐商品
    wx.request({
      url: requesturl + 'getSaleProductRateList',
      data: {
        productId: that.data.id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        console.log("获取商品评论列表:");
        console.log(res);

        if (res.data.code == 0) {
          that.setData({
            pinglunlist: res.data.data
          })
        }
      }
    })
  },
  //菜单的选择
  chkmenu: function(e) {

    var that = this;
    //参数部分
    var id = e.currentTarget.dataset.id;
    that.setData({
      chkmenu: parseInt(id), //选中的菜单
    })
  },
  //点击推荐
  godetail: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.redirectTo({
      url: '../goods/index?id=' + id,
    })
  },
  /* 点击减号 */
  bindMinus: function() {
    var num = this.data.num;
    // 如果大于1时，才可以减
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
    this.change_price();
  },
  /* 点击加号 */
  bindPlus: function() {
    var num = this.data.num;
    // 不作过多考虑自增1
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
    this.change_price();
  },
  /* 输入框事件 */
  bindManual: function(e) {
    var num = e.detail.value;
    if (isNaN(num)) {
      num = 1;
    }
    // 将数值与状态写回
    this.setData({
      num: parseInt(num)
    });
    this.change_price();
  },
  //修改价格
  change_price: function() {
    var that = this;
    var price = that.data.danjia;
    console.log("蛋糕的单价:" + price);
    that.setData({
      amount: price * that.data.num
    })
  },
  //弹出
  modal_show: function(e) {
    this.setData({
      choose_modal: "block",
    });
  },
  //消失
  modal_none: function() {
    this.setData({
      choose_modal: "none",
    });
  },
  //弹窗选择规格属性
  choose_spec: function() {
    var that = this;
    that.setData({
      choose_modal: "block", //显示弹窗
    })
  },
  //初始化选择规格数量
  initSpec: function() {
    var that = this;
    //得到商品的参数信息
    var id = that.data.id;
    var selectAttrid = that.data.selectAttrid;
    //商品规格
    wx.request({
      url: requesturl + 'getSaleProductSpecList',
      data: {
        productId: id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        console.log("获取规格列表");
        console.log(res);

        if (res.data.code == 0) 
        {
          //充值数据，成为可选项
          var result = res.data.data;
          var childlist = [];
          var danjia = 0;
          for (var i = 0; i < result.length; i++) {
            if (result[i].id == selectAttrid) {
              childlist[i] = {
                id: result[i].id,
                name: result[i].name,
                isSelect: true,
                price: result[i].price,
              }
              danjia = result[i].price;
            } else {
              childlist[i] = {
                id: result[i].id,
                name: result[i].name,
                isSelect: false,
                price: result[i].price,
              }
            }
          }
          //数据的赋值
          that.setData({
            spec: [{
              id: 1,
              name: "规格",
              child: childlist
            }], //规格部分
            amount: danjia, //第一个规格的价格
            danjia: danjia, //第一个规格的价格
          })
        }
      }
    })
  },
  //属性选择
  clickAttr: function(e) {
    var that = this;
    //获取参数
    var pid = e.currentTarget.dataset.pid;
    var id = e.currentTarget.dataset.id;
    var danjia = 0; //蛋糕的单价
    console.log("参数值:" + pid + "," + id);
    //获取选择的数据
    var txtarry = [];
    //重置选择的数据
    var specdata = that.data.spec;
    for (var i = 0; i < specdata.length; i++) {
      if (pid == specdata[i].id) {
        var child = [];
        for (var j = 0; j < specdata[i].child.length; j++) {

          if (id == specdata[i].child[j].id) {
            child[j] = {
              id: specdata[i].child[j].id,
              name: specdata[i].child[j].name,
              isSelect: true,
              price: specdata[i].child[j].price,
            }
            danjia = specdata[i].child[j].price;
          } else {
            child[j] = {
              id: specdata[i].child[j].id,
              name: specdata[i].child[j].name,
              isSelect: false,
              price: specdata[i].child[j].price,
            }
          }
        }
        txtarry[i] = {
          id: specdata[i].id,
          name: specdata[i].name,
          child: child
        };
      } //没有选中的
      else {
        txtarry[i] = {
          id: specdata[i].id,
          name: specdata[i].name,
          child: specdata[i].child
        };
      }
      //结束标识符
    }

    console.log("重置后的属性数据:");
    console.log(txtarry);
    //赋值数据
    that.setData({
      spec: txtarry, //变换选择框
    });

    //得到选中的数据,更新价格
    var selectName = '',
      selectAttrid = '';
    for (var i = 0; i < that.data.spec.length; i++) {
      for (var j = 0; j < that.data.spec[i].child.length; j++) {
        if (that.data.spec[i].child[j].isSelect) {
          selectName = that.data.spec[i].child[j].name
          selectAttrid = that.data.spec[i].child[j].id;
        }
      }
    }
    that.setData({
      selectName: selectName,
      selectAttrid: selectAttrid,
      danjia: danjia, //第一个规格的价格
    })
    //价格的改变
    that.change_price();
  },
  //属性规格的选择确定按钮
  okopt: function() {
    var that = this;
    var selectName = that.data.selectName;
    var spec = that.data.spec;
    var chknum = 0;
    if (selectName != "") {
      chknum = selectName.split(",").length - 1;
    }
    console.log("选择的属性数值:" + chknum + "," + spec.length);
    //判断规格的选择
    if (that.data.selectName == "" || chknum != spec.length) {
      wx.showModal({
        title: '提示',
        content: '请选择商品的规格',
        showCancel: false
      })
    } else {
      //关闭弹窗
      that.setData({
        choose_modal: "none"
      })
    }
  },
  //获取备注
  getpaitxt: function(e) {
    var that = this;

    var txtval = e.detail.value;

    that.setData({
      paitxt: txtval
    })
  },
  //立即购买
  buyopt: function() {
    var that = this;
    //参数部分
    var gid = that.data.selectAttrid; //商品id
    var name = that.data.name; //商品的名称
    var amount = that.data.amount; //总价
    var price = that.data.danjia; //单价
    var bangnum = that.data.selectName; //选择的磅数
    var buynum = that.data.num; //购买的个数
    var paitxt = that.data.paitxt == "" ? "生日快乐" : that.data.paitxt; //生日牌
    var gtu = that.data.default_spe_img; //生日牌
    //关闭弹窗
    that.setData({
      choose_modal: "none"
    })

    //跳转到提交订单页面
    wx.navigateTo({
      url: '../payfor/index?gid=' + gid + "&name=" + name + "&amount=" + amount +
        "&price=" + price + "&bangnum=" + bangnum + "&buynum=" + buynum + "&paitxt=" +
        paitxt + "&gtu=" + gtu,
    })
  },
  //加入到购物车
  cartopt: function() {
    var that = this;

    //参数部分
    var gid = that.data.id; //商品id
    var name = that.data.name; //商品的名称
    var amount = that.data.amount; //总价
    var price = that.data.danjia; //单价
    var bangnum = that.data.selectName; //选择的磅数
    var buynum = that.data.num; //购买的个数
    var paitxt = that.data.paitxt == "" ? "生日快乐" : that.data.paitxt; //生日牌
    var selectAttrid = that.data.selectAttrid; //规格id

    //参数的整理
    var params = {
      id: selectAttrid,
      fAmount: buynum,
      remark: paitxt,
      openid: getApp().globalData.openID
    };
    var strParam = JSON.stringify(params);
    //添加到购物车
    wx.request({
      url: requesturl + 'insertCart',
      data: {
        strParam: strParam
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        console.log("添加到购物车:");
        console.log(res);

        if (res.data.code == 0) {
          wx.showToast({
            title: '添加成功',
            duration: 2000
          })
          wx.switchTab({
            url: '../shopcart/index',
          })
          //关闭弹窗
          that.setData({
            choose_modal: "none"
          })
        } else {
          wx.showToast({
            title: '添加失败',
            duration: 2000,
            icon: 'none',
            mask: true
          })
          //关闭弹窗
          that.setData({
            choose_modal: "none"
          })
        }
      }
    })
  },
  //结束标识符
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