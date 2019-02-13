// pages/article-log/article-log.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleList:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userOpenId = getApp().globalData.userOpenId;
    let localhost = getApp().globalData.localhost;
    let that = this;
    wx.request({
      url: 'http://' + localhost + '/Fun1/Home/Article/mylog',
      data: { userOpenId: userOpenId },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        that.setData({
          articleList: res.data,
        })
      }
    })

  },

  //跳转到文章详情页面
  onTapToDetail: function (e) {
    let userOpenId = getApp().globalData.userOpenId;
    let localhost = getApp().globalData.localhost;
    console.log('articleId', e.currentTarget.dataset.articleid);
    let articleId = e.currentTarget.dataset.articleid;
    wx.request({
      url: 'http://' + localhost + '/Fun1/Home/Article/log',
      data: { userOpenId: userOpenId, articleId: articleId },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.navigateTo({
          url: '/pages/article-detail/article-detail?articleId=' + articleId
        })
      }
    })

  },

  //
  dele: function (e) {
    let userOpenId = getApp().globalData.userOpenId;
    let localhost = getApp().globalData.localhost;
    let that = this;
    wx.request({
      url: 'http://' + localhost + '/Fun1/Home/Article/delelog',
      data: { userOpenId: userOpenId },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          articleList: [],
        })
        that.onLoad();
      }
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