// pages/test-log/test-log.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    testList:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userOpenId = getApp().globalData.userOpenId;
    let localhost = getApp().globalData.localhost;
    let that = this;
    wx.request({
      url: 'http://' + localhost + '/Fun1/Home/Test/mylog',
      data: { userOpenId: userOpenId },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        that.setData({
          testList: res.data,
        })
      }
    })

  },

  //dele
  dele: function (e) {
    let userOpenId = getApp().globalData.userOpenId;
    let localhost = getApp().globalData.localhost;
    let that = this;
    wx.request({
      url: 'http://' + localhost + '/Fun1/Home/Test/delelog',
      data: { userOpenId: userOpenId },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          testList: [],
        })
        that.onLoad();
      }
    })

  },

  //跳转到结果页面
  onTapToDetail: function (e) {
    let qid = e.currentTarget.dataset.qid;
    wx.navigateTo({
      url: '/pages/result/result?qid=' + qid
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