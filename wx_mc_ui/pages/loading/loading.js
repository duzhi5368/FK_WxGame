// pages/loading/loading.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationData:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {

    

    // var deNum = 0;
    // function autoTsq() {
    //   document.getElementsByClassName("mvSq")[0].style.color = "#F5FAFD";
    //   document.getElementsByClassName("mvSq")[1].style.color = "#F5FAFD";
    //   document.getElementsByClassName("mvSq")[2].style.color = "#F5FAFD";
    //   setTimeout(function() {
    //     // document.getElementsByClassName("mvSq")[0].style.color = "#29B6FF";
    //   }, 0);
    //   setTimeout(function() {
    //     // document.getElementsByClassName("mvSq")[1].style.color = "#29B6FF";
    //   }, 500);
    //   setTimeout(function() {
    //     // document.getElementsByClassName("mvSq")[2].style.color = "#29B6FF";
    //   }, 1000);
    // }


    // setInterval(autoTsq, 1500);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  /**
  *位移
  */
  translate: function () {
    //x轴位移100px

    this.animation.translate(100, 0).step()
    this.setData({
      //输出动画
      animation: this.animation.export()
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })

    this.animation = animation

    // animation.scale(2, 2).rotate(45).step()

    console.log(this.animation);

    this.setData({
      animationData: animation.export()
    })
    var n = 50;
    //连续动画需要添加定时器,所传参数每次+1就行
    setInterval(function () {
      
      n = n + 1;
      console.log(n);
    
      this.animation.translate(n,0).step()
      
    }.bind(this), 1000)
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