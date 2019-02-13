// pages/material-list/material-list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    materialList:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMaterialInfo();

  },

  getMaterialInfo: function () {
    let that = this;
    let localhost = getApp().globalData.localhost;
    wx.request({
      url: 'http://' + localhost +'/Fun1/Home/Material/materialList',
      data: {},
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
         console.log(res.data);
        that.setData({
          materialList: res.data
        })
      }
    })
  },

  materialDetail: function (e) {
    //console.log('articletype',e.currentTarget.dataset.articletype);
    let materialId = e.currentTarget.dataset.materialid;
    console.log(materialId)
    wx.navigateTo({
      url: '/pages/material-detail/material-detail?materialId=' + materialId
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