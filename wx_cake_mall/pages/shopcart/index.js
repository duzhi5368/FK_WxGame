// pages/shopcart/index.js
var requesturl = getApp().globalData.requesturl; //请求接口的数据
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartlist: [], //购物车列表
    sumprice: 0, //总价
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //得到购物车列表数据
  getcartlist: function () {
    var that = this;
    //请求得到购物车数据
    wx.request({
      url: requesturl + 'getCartProductList',
      data: {
        openid: getApp().globalData.openID
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function (res) {
        console.log("请求购物车列表数据:");
        console.log(res);
        if (res.data.code == 0) {
          //赋值部分
          that.setData({
            cartlist: res.data.data
          })
        }
      }
    })
  },
  //计算购物车总价钱
  getsumprice: function () {
    var that = this;

    //请求得到购物车总价
    var cartlist = that.data.cartlist;
    var sumprice = 0; //总价
    for (var i = 0; i < cartlist.length; i++) {
      if (cartlist[i].ischk) {
        sumprice += cartlist[i].famount * cartlist[i].price
      }
    }
    that.setData({
      sumprice: sumprice.toFixed(2), //总价
    })
  },
  //购物车减少
  goodsjian: function (e) {
    var that = this;

    //接受参数
    var id = e.currentTarget.dataset.id;
    var buynum = e.currentTarget.dataset.buynum;
    buynum = parseInt(buynum);
    buynum = buynum - 1 == 0 ? 1 : buynum - 1;
    //更新购物车
    that.editshopcart(id, buynum);
  },
  //购物车增加
  goodsjia: function (e) {
    var that = this;
    //接受参数
    var id = e.currentTarget.dataset.id;
    var buynum = e.currentTarget.dataset.buynum;
    buynum = parseInt(buynum);
    buynum = buynum + 1;
    //更新购物车
    that.editshopcart(id, buynum);
  },
  //购物车商品数据的修改
  editshopcart: function (id, buynum) {
    var that = this;
    //参数部分
    var cartlist = that.data.cartlist;
    //请求接口，得到数据
    wx.request({
      url: requesturl + 'changeCartAmount',
      data: {
        id: id,
        famount: buynum
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function (res) {
        console.log("商品数量修改数据:");
        console.log(res);
        if (res.data.code == 0) {
          console.log("商品数量更新成功");
          that.updatecart(id, buynum);
        } else {
          console.log("商品数量更新失败");
        }
      }
    })
  },
  //更新页面的数量
  updatecart: function (id, buynum){
    var that=this;
    //购物车列表
    var cartlist = that.data.cartlist;
    var txtarry=[];
    //循环重置数据
    for (var i = 0; i < cartlist.length;i++)
    {
      if (id == cartlist[i].id){
        txtarry[i]={
          id: cartlist[i].id,
          product_spec_id: cartlist[i].product_spec_id,
          prodcutId: cartlist[i].prodcutId,
          name: cartlist[i].name,
          pic: cartlist[i].pic,
          price: cartlist[i].price,
          spec: cartlist[i].spec,
          famount: buynum,
          remark: cartlist[i].remark,
          ischk: cartlist[i].ischk,
        }
      }else{
        txtarry[i] = {
          id: cartlist[i].id,
          product_spec_id: cartlist[i].product_spec_id,
          prodcutId: cartlist[i].prodcutId,
          name: cartlist[i].name,
          pic: cartlist[i].pic,
          price: cartlist[i].price,
          spec: cartlist[i].spec,
          famount: cartlist[i].famount,
          remark: cartlist[i].remark,
          ischk: cartlist[i].ischk,
        }
      }
    }
    that.setData({
      cartlist: txtarry
    })
    //更新价格
    that.getsumprice();
  },
  //选择需要操作的商品
  chkopt: function (e) {
    var that = this;
    //参数部分
    var id = e.currentTarget.dataset.id;
    var cartlist = that.data.cartlist;
    var txtarry = [];
    //循环重置数据
    for (var i = 0; i < cartlist.length; i++) {
      if (id == cartlist[i].id) {
        txtarry[i] = {
          id: cartlist[i].id,
          product_spec_id: cartlist[i].product_spec_id,
          prodcutId: cartlist[i].prodcutId,
          name: cartlist[i].name,
          pic: cartlist[i].pic,
          price: cartlist[i].price,
          spec: cartlist[i].spec,
          famount: cartlist[i].famount,
          remark: cartlist[i].remark,
          ischk: !cartlist[i].ischk,
        }
      } else {
        txtarry[i] = {
          id: cartlist[i].id,
          product_spec_id: cartlist[i].product_spec_id,
          prodcutId: cartlist[i].prodcutId,
          name: cartlist[i].name,
          pic: cartlist[i].pic,
          price: cartlist[i].price,
          spec: cartlist[i].spec,
          famount: cartlist[i].famount,
          remark: cartlist[i].remark,
          ischk: cartlist[i].ischk,
        }
      }
    }
    console.log("重置后的数据:");
    console.log(txtarry);

    that.setData({
      cartlist: txtarry,
    })

    //计算购物车总价钱
    that.getsumprice();
  },
  //清空操作
  clearall: function () {
    var that = this;
    //清空购物车
    wx.request({
      url: requesturl + 'clearCart',
      data: {
        openid:getApp().globalData.openID
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function (res) {
        console.log("清空购物车");
        console.log(res);

        if (res.data.code == 0) {
          that.setData({
            cartlist: [], //购物车列表
            sumprice: 0, //总价
          })
        }
      }
    })
  },
  //删除购物车
  deleteopt: function (e) {
    var that = this;
    //获取参数
    var delids = "";
    var cartlist = that.data.cartlist;
    var sumprice = 0; //总价
    for (var i = 0; i < cartlist.length; i++) {
      if (cartlist[i].ischk) {
        delids += cartlist[i].id + ",";
      }
    }
    if (delids == "") {
      wx.showToast({
        title: '至少选择一项',
        duration:2000,
        mask:true,
        icon:"none"
      })
    } else {
      //购物车删除
      wx.request({
        url: requesturl + 'deleteCartByIds',
        data: {
          ids: delids
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        success: function (res) {
          console.log("删除购物车数据:");
          console.log(res);
          if (res.data.code == 0) {
            wx.showToast({
              title: '删除成功',
              mask: true,
              duration: 2000
            })
            //重新获取列表数据
            that.getcartlist();
          } else {
            wx.showToast({
              title: '删除失败',
              mask: true,
              duration: 2000,
              icon: 'none'
            })
          }
        }
      })
    }
  },
  //结算按钮
  jiesuan: function () {
    var that = this;

    var sumprice = that.data.sumprice; //总价   
    var cartlist = that.data.cartlist; //购物车列表
    var txtarry = [],
      num = 0;
    //循环遍历，获取选中的商品
    for (var i = 0; i < cartlist.length; i++) {
      if (cartlist[i].ischk) {
        txtarry[num] = cartlist[i];
        num++;
      }
    }
    //设置缓存
    wx.setStorage({
      key: 'cartlist',
      data: txtarry,
    })

    if (sumprice != 0) {
      wx.navigateTo({
        url: '../payfor/detail?sumprice=' + sumprice,
      })
    } else {
      wx.showToast({
        title: '至少选择一项',
        duration: 2000,
        mask: true,
        icon: 'none'
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;

    //得到购物车列表数据
    that.getcartlist();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})