//const wxParser = require('../../wxParser/index')
Page({
  data: {
    article: []
  },

  onLoad(options) {
    var postId = options.id
    var group_id = options.group_id
    this.fetchArticles(postId)
  },

  fetchArticles(postId) {
    let contentGroupID = 1524464059868849
    let MyContentGroup = new wx.BaaS.ContentGroup(contentGroupID)
    MyContentGroup.getContent(postId).then(res => {
      this.setData({
        article: res.data,
      })
      this.renderContent(res.data.content)
    }, err => {
      console.log(res)
    })
  },

  renderContent: function (content) {
    wxParser.parse({
      bind: 'richText',
      html: content,
      target: this,
    })
  }
})