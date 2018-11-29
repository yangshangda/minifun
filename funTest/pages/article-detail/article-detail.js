Page({
  data: {
    article: [],
    articlecontent: ''
  },

  onLoad(options) {
    var articleId = options.articleId
    //var group_id = options.group_id
     this.fetchArticles(articleId)
    
  },


  fetchArticles(articleId) {
    var that = this;
    wx.request({
      url: 'http://localhost/Fun1/Home/Article/articleDetail',//文章详情接口
      data: { articleId: articleId },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
        // 'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data.articleDetail[0]);
        console.log(res.data.content);
        that.setData({
          article: res.data.articleDetail[0],
          articlecontent: res.data.content
        })                
      }
    })
  },

  
})