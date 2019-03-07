// pages/user/user.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:[],
    likeNum: '',
    collectNum:'',
    age:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let userOpenId = getApp().globalData.userOpenId;
    let localhost = getApp().globalData.localhost;
    wx.request({
      url: 'http://'+localhost+'/Fun1/Home/User/userInfo',//用户信息接口
      data: { userOpenId: userOpenId},
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res.data[0]);
        let createTime = res.data[0]['createtime'];
        //let age = that.datedifference(createTime,Date)
        var date = new Date();
        var Y = date.getFullYear(); 
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        let age = that.datedifference(createTime, Y+'-'+M+'-'+D);
        console.log(Y, M,D)
        that.setData({
          userInfo: res.data[0],
          //age:age
        });
      }
    })

    that.likeNum(userOpenId);
    that.collectNum(userOpenId);

  },

  money: function () {
    
    let params = {
      totalCost: 0.1,
      merchandiseDescription: '深蓝色秋裤'
    }
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.BaaS.pay(params)
        } else {
          wx.BaaS.login()
        }
      }
    })
    wx.BaaS.pay(params).then(res => {
     
    }, err => {
      
      console.log(err)
    })

  },

  likeNum: function(userOpenId) {
    var that = this;
    let localhost = getApp().globalData.localhost;
    wx.request({
      url: 'http://' + localhost + '/Fun1/Home/User/likeNum',
      data: {userOpenId: userOpenId },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
        // 'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          likeNum: res.data.likeNum
        })
      }
    })
  },

  collectNum: function (userOpenId) {
    var that = this;
    let localhost = getApp().globalData.localhost;
    wx.request({
      url: 'http://' + localhost + '/Fun1/Home/User/collectNum',
      data: { userOpenId: userOpenId },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
        // 'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          collectNum: res.data.collectNum
        })
      }
    })
  },

  datedifference: function(sDate1, sDate2) {    //sDate1和sDate2是2006-12-18格式  
    let that = this;
    var dateSpan,
    tempDate,
    iDays;
    sDate1 = Date.parse(sDate1);
    sDate2 = Date.parse(sDate2);
    dateSpan = sDate2 - sDate1;
    dateSpan = Math.abs(dateSpan);
    iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
    //return iDays;
    that.setData({
      age: iDays+'天'
    });
  },

  // //客服中心
  // customService: function () {
  //   let that = this;
  //   wx.request({
  //     url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx7b5d668466d6f342&secret=14bee27860fa6a1d36fc47f6fbdb596c',//调取客服接口
  //     data: {},
  //     method: "GET",
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded' // 默认值
  //     },
  //     success: function (res) {
  //       console.log(res);
  //       // that.setData({
  //       //   sortArticleList: res.data
  //       // });
  //     }
  //   })
  // },

  //关于我们
  about_us: function (e) {
    wx.navigateTo({
      url: '/pages/about-us/about-us'
    })
  },

  //主页
  maintag: function (e) {
    wx.navigateTo({
      url: '/pages/index/index'
    })
  },

  //我看过的
  articleLog: function (e) {
    wx.navigateTo({
      url: '/pages/article-log/article-log'
    })
  }, 

  //我的测试
  testLog: function (e) {
    wx.navigateTo({
      url: '/pages/test-log/test-log'
    })
  },

  //我的收藏
  articleCollect: function (e) {
    wx.navigateTo({
      url: '/pages/article-collect/article-collect'
    })
  },

  //咨询师
  consult: function (e) {
    wx.navigateTo({
      url: '/pages/consult/consult'
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