// pages/consult-detail/consult-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    var that = this;
    let localhost = getApp().globalData.localhost;

    wx.request({
      url: 'http://' + localhost + '/Fun1/Home/Consult/consultDetail',//详情接口
      data: {id: id},
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
        // 'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          info: res.data,
        })
      }
    })

  },

  tel: function (e) {
    var phone = e.currentTarget.dataset.phone;
    console.log(phone);
    wx.makePhoneCall({
      phoneNumber: phone,
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