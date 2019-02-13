//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    sendPost: [] ,
    getArticle: [],
    
  },
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  onLoad: function () {
    this.getBannerInfo();
    this.getArticleInfo();
    
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }
  getBannerInfo: function() {
    let that = this;
    let localhost = getApp().globalData.localhost;
    wx.request({
      url: 'http://' + localhost +'/Fun1/Home/Banner/index',//轮播图接口
      data: {},
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          sendPost: res.data
        })
      }
    })
  },
  getArticleInfo: function () {
    let that = this;
    let localhost = getApp().globalData.localhost;
    wx.request({
      url: 'http://' + localhost +'/Fun1/Home/Article/index',//轮播图接口
      data: {},
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          getArticle: res.data
        })
      }
    })
  },

  //更多分类
  more: function() {
    wx.navigateTo({
      url: '/pages/more/more',
    })
  },

  //文章列表
  articleList: function (e) {
    console.log('articletype', e.currentTarget.dataset.articletype);
    let articleType = e.currentTarget.dataset.articletype;
    let typeName = '';
    if (articleType == 1) {
      typeName = '情感类';
    } else if (articleType == 2) {
      typeName = '性格类';
    } else if (articleType == 3) {
      typeName = '趣味类';
    } else {
      typeName = '综合';
    }
    wx.navigateTo({
      url: '/pages/article-list/article-list?articleType=' + articleType + '&&typeName=' + typeName
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
      data: { userOpenId: userOpenId, articleId: articleId},
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


})
