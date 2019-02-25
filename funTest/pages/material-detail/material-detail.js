// pages/material-detail/material-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    material: [],
    materialinput:[],
    name:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var materialId = options.materialId
    this.material(materialId)

  },

  material: function(materialId) {
    var that = this;
    let localhost = getApp().globalData.localhost;
    wx.request({
      url: 'http://' + localhost +'/Fun1/Home/Material/materialDetail',//详情接口
      data: { materialId: materialId },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        console.log(JSON.parse(res.data[0].materialinput))
        var input = JSON.parse(res.data[0].materialinput)
        //console.log(materialinput)
        that.setData({
          material: res.data[0],
          materialinput: input,
          // materialinput: materialinput
        })
      }
    })
  },

  name: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  buttonchange: function (materialId) {
    var that = this;
    
    let name = that.data.name
    console.log(name);
    let id = that.data.material['materialid'];
    let localhost = getApp().globalData.localhost;
    wx.request({
      url: 'http://' + localhost +'/Fun1/Api/'+id+'.php',//详情接口
      data: { name: name, id: id},
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res.data.url)
        let url = res.data.url
        wx.navigateTo({
          url: '/pages/make-material/make-material?url=' + url
        })

        //console.log(JSON.parse(res.data[0].materialinput))
        //var input = JSON.parse(res.data[0].materialinput)
        //console.log(materialinput)
        
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