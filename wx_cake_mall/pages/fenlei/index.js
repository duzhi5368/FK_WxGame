// pages/fenlei/index.js
var requesturl=getApp().globalData.requesturl;//请求接口的地址
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:1,//筛选的条件
    kind:'类别',//类别
    kindid:0,//类别id
    kindlist:[],//类别列表
    islist:true,//列表显示    
    cakelist:[],//蛋糕列表
    showkind:'none',//显示类别下拉列表
    pageNum:1,//页码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;

    //得到列表数据
    that.getmenu();
  },
  //菜单部分
  getmenu: function () {

    var that = this;

    var menulist = [
      {
        id: "0",
        name: '全部',
      },
    ];
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
      success: function (res) {
        console.log("分类数据:");
        console.log(res);

        if (res.data.code == 0) {
          that.setData({
            kindlist: res.data.data
          })
        }
      }
    })
    //得到蛋糕
    that.getcakelist();
    //结束标识符
  },
  //得到列表数据
  getcakelist:function(){
    var that=this;

    //参数部分
    var filter = that.data.id;//筛选的条件
    var kind = that.data.kindid;//类别
    console.log("类别:" + kind);

    //获取蛋糕列表
    wx.request({
      url: requesturl + 'getSaleProductList',
      data: {
        typeId: kind,
        page:1
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function (res) {
        console.log("产品列表:");
        console.log(res);

        if (res.data.code == 0) {
          that.setData({
            cakelist: res.data.data
          })
        }
      }
    })
  },
  //选择菜单
  chkfilter:function(e){
    var that=this;
    //参数部分
    var id=e.currentTarget.dataset.id;
    var kind = that.data.kind;
    var kindid = that.data.kindid;   
    var islist = that.data.islist;
    var showkind = that.data.showkind;//显示类别下拉列表
    //判断参数
    if (id==1){
       kind = "类别";
       kindid = 0;     
       showkind = 'none';
    }else if(id==2){
      showkind = 'block';
    }else if (id == 4) {
      showkind = 'none';
      islist = !islist;
    }

    //赋值部分
    that.setData({
      id: id,
      kind: kind,
      kindid: kindid,
      islist: islist,
      showkind: showkind,//显示类别下拉列表
    })
    //得到列表数据
    that.getcakelist();
  },
  //选择类别
  chkkind:function(e){
    var that=this;

    var txtval=e.currentTarget.dataset.name;
    var id = e.currentTarget.dataset.id;

    that.setData({
      id:2,
      kindid: id,
      kind: txtval,
      showkind:'none'
    })
    //刷新
    that.getcakelist();
  },
  //选择标签
  choosefilter: function (e) {
    var that = this;

    var txtval = e.currentTarget.dataset.name;

    that.setData({
      id: 3,
      biaoqian: txtval,
      showkind: 'none',
      showfilter: 'none'
    })
    //刷新
    that.getcakelist();
  },
  //点击商品，进入商品详情页面
  godetail: function (e) {
    var id = e.currentTarget.dataset.id;
    var name = e.currentTarget.dataset.name;
    var price = e.currentTarget.dataset.price;
    wx.navigateTo({
      url: '../goods/index?id=' + id + "&name=" + name + "&price=" + price,
    })
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
    var that=this;
    // 显示顶部刷新图标
    //wx.showNavigationBarLoading();
    that.setData({
      pageNum: 1
    })
    //滑动获取更多分页数据
    that.getcakelist();
    // 隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
     var that=this;

     var pageNum = that.data.pageNum+1;
     that.setData({
       pageNum: pageNum
     })
     //滑动获取更多分页数据
     that.getmorecakelist();
  },
  //滑动获取更多分页数据
  getmorecakelist: function () {
    var that = this;

    //参数部分
    var filter = that.data.id;//筛选的条件
    var kind = that.data.kindid;//类别
    console.log("类别:" + kind);

    //获取蛋糕列表
    wx.request({
      url: requesturl + 'getSaleProductList',
      data: {
        typeId: kind,
        page: that.data.pageNum
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function (res) {
        console.log("产品列表:");
        console.log(res);

        if (res.data.code == 0) 
        {
          var cakelist = that.data.cakelist;
          cakelist = cakelist.concat(res.data.data);
          that.setData({
            cakelist: cakelist
          })
        }else{
          console.log("获取分页数据失败");
        }
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})