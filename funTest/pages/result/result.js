// pages/result/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:[],
    qid:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var qid = options.qid
    var score = options.allscore
    console.log(qid,score)
    this.setData({
      qid: qid
    });
    this.result(qid, score)
    

  },

  result: function (qid, score) {
    let localhost = getApp().globalData.localhost;
    let userOpenId = getApp().globalData.userOpenId;
    let that = this;
    wx.request({
      url: 'http://' + localhost + '/Fun1/Home/Test/result',//用户信息接口
      data: { userOpenId: userOpenId, qid: qid, score: score},
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          info: res.data
        });
      }
    })

    
  },

  user: function () {
    wx.reLaunch({
      url: '../user/user',
    })

  },

  // 测试题
  reset: function () {
    let questionid = this.data.qid;
    wx.navigateTo({
      url: '/pages/test-detail/test-detail?questionid=' + questionid
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