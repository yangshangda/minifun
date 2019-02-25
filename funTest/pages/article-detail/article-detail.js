Page({
  data: {
    article: [],
    articlecontent: '',
    likeNum: 0,
    like:'',
    articleId:'',
    collectNum: 0,
    collect: '',
  },

  onLoad(options) {
    var articleId = options.articleId
    //var group_id = options.group_id
    this.fetchArticles(articleId)
    //this.like(articleId)
    
  },


  fetchArticles(articleId) {
    var that = this;
    let localhost = getApp().globalData.localhost;
    let userOpenId = getApp().globalData.userOpenId;
    wx.request({
      url: 'http://' + localhost +'/Fun1/Home/Article/articleDetail',//文章详情接口
      data: { articleId: articleId, userOpenId: userOpenId },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
        // 'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data.articleDetail[0]);
        console.log(res.data.content);
        that.setData({
          articleId: articleId,
          article: res.data.articleDetail[0],
          articlecontent: res.data.content,
          likeNum: res.data.likeNum,
          like: res.data.like,
          collectNum: res.data.collectNum,
          collect: res.data.collect,
        })
      }
    })
  },

  no_like() {
    var that = this;
    let localhost = getApp().globalData.localhost;
    let userOpenId = getApp().globalData.userOpenId;
    let articleId = that.data.articleId;
    let likeNum = that.data.likeNum;
    wx.request({
      url: 'http://' + localhost + '/Fun1/Home/Article/noLike',
      data: { articleId: articleId, userOpenId: userOpenId },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
        // 'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          likeNum: likeNum - 1,
          like: '0'
        })
      }
    })
  },

  i_like() {
    var that = this;
    let localhost = getApp().globalData.localhost;
    let userOpenId = getApp().globalData.userOpenId;
    let articleId = that.data.articleId;
    let likeNum = that.data.likeNum;
    wx.request({
      url: 'http://' + localhost + '/Fun1/Home/Article/iLike',
      data: { articleId: articleId, userOpenId: userOpenId },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
        // 'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          likeNum: likeNum + 1,
          like: '1'
        })
      }
    })
  },

  no_collect() {
    var that = this;
    let localhost = getApp().globalData.localhost;
    let userOpenId = getApp().globalData.userOpenId;
    let articleId = that.data.articleId;
    let collectNum = that.data.collectNum;
    wx.request({
      url: 'http://' + localhost + '/Fun1/Home/Article/noCollect',
      data: { articleId: articleId, userOpenId: userOpenId },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
        // 'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          collectNum: collectNum - 1,
          collect: '0'
        })
      }
    })
  },

  i_collect() {
    var that = this;
    let localhost = getApp().globalData.localhost;
    let userOpenId = getApp().globalData.userOpenId;
    let articleId = that.data.articleId;
    let collectNum = that.data.collectNum;
    wx.request({
      url: 'http://' + localhost + '/Fun1/Home/Article/iCollect',
      data: { articleId: articleId, userOpenId: userOpenId },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
        // 'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          collectNum: collectNum + 1,
          collect: '1'
        })
      }
    })
  },

  
})