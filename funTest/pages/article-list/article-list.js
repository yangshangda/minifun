// pages/article-list/article-list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleList:[],
    typeName:'',
    articleType:'',
    navbar: ['文章', '测试'],
    currentTab: 0,
    questionnaireList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    //console.log(options.articleType);
    wx.request({
      url: 'http://localhost/Fun1/Home/Article/articleList',//文章列表接口
      data: { articleType: options.articleType },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log('data:',res.data);
        that.setData({
          articleList: res.data,
          typeName: options.typeName,
          articleType: options.articleType
        })
      }
    });

    that.questionnaireList(options.articleType);


  },

  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

// 测试问卷
  questionnaireList: function (questionType) {
    let that = this;
    wx.request({
      url: 'http://localhost/Fun1/Home/Test/questionnaireList',//测试问卷列表接口
      data: { questionType: questionType },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log('data1:', res.data);
        that.setData({
          questionnaireList: res.data,
         // typeName: options.typeName,
        })
      }
    })
  },

  // 测试题
  onTapToTest: function (e) {
    let questionid = e.currentTarget.dataset.questionid;
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