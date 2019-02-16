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
    this.list();

  },

  list: function () {
    let localhost = getApp().globalData.localhost;
    let that = this;
    wx.request({
      url: 'http://' + localhost + '/Fun1/Home/Consult/info',
      data: {},
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        that.setData({
          info: res.data,
        })
      }
    })

  },

  //跳转到详情页面
  onTapToDetail: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/consult-detail/consult-detail?id=' + id
    })

  },

  inter_name: function(e) {
    var name = e.detail.value
    console.log(e.detail.value)
    let localhost = getApp().globalData.localhost;
    let that = this;
    wx.request({
      url: 'http://' + localhost + '/Fun1/Home/Consult/info',
      data: { name: name},
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        that.setData({
          info: res.data,
        })
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