// pages/new/new.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sortArticleList:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.sortArticleList();

  },

  //文章列表
  articleList: function (e) {
    //console.log('articletype',e.currentTarget.dataset.articletype);
    let articleType = e.currentTarget.dataset.articletype;
    let articleTypeName = e.currentTarget.dataset.articletypename;
    let typeName = '';
    if (articleType == 1 || articleTypeName == '情感') {
      articleType = 1;
      typeName = '情感类';
    } else if (articleType == 2 || articleTypeName == '性格') {
      articleType = 2;
      typeName = '性格类';
    } else if (articleType == 3 || articleTypeName == '趣味') {
      articleType = 3;
      typeName = '趣味类';
    } else {
      articleType = 10;
      typeName = '综合';
    }
    
    wx.navigateTo({
      url: '/pages/article-list/article-list?articleType=' + articleType + '&&typeName=' + typeName
    })
  },

  //分类文章列表
  sortArticleList: function (e) {
    let that = this;
    console.log(e);
    //let articleType = e.currentTarget.dataset.articletype;
    wx.request({
      url: 'http://localhost/Fun/Home/Article/sortArticleList',//文章列表接口
      data: {},
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          sortArticleList: res.data
        });
      }
    })
  },

  //个人中心
  user: function (e) {
    wx.navigateTo({
      url: '/pages/user/user'
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