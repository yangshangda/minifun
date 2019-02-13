// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let userOpenId = getApp().globalData.userOpenId;
    let localhost = getApp().globalData.localhost;
    wx.request({
      url: 'http://'+localhost+'/Fun/Home/User/userInfo',//用户信息接口
      data: { userOpenId: userOpenId},
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res.data[0]);
        that.setData({
          userInfo: res.data[0]
        });
      }
    })

  },

  // //客服中心
  // customService: function () {
  //   let that = this;
  //   wx.request({
  //     url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx7b5d668466d6f342&secret=14bee27860fa6a1d36fc47f6fbdb596c',//调取客服接口
  //     data: {},
  //     method: "GET",
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded' // 默认值
  //     },
  //     success: function (res) {
  //       console.log(res);
  //       // that.setData({
  //       //   sortArticleList: res.data
  //       // });
  //     }
  //   })
  // },

  //关于我们
  about_us: function (e) {
    wx.navigateTo({
      url: '/pages/about-us/about-us'
    })
  },

  //我看过的
  articleLog: function (e) {
    wx.navigateTo({
      url: '/pages/article-log/article-log'
    })
  },

  //咨询师
  consult: function (e) {
    wx.navigateTo({
      url: '/pages/consult/consult'
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