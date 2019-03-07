
Page({

  /**
   * 页面的初始数据
   */
  data: {
    login: 0,
    animation: '',
    deviceHeight: "",
    deviceWidth: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

    let that = this

    wx.getSystemInfo({
      success: (res) => {
        that.setData({
          deviceWidth: res.windowWidth,
          deviceHeight: res.windowHeight
        });
      }
    });
      
  },

//进入首页按钮：获取用户信息和openid
  userInfoHandler(userInfo) {
    wx.login({
      success: function (userCode) {
        //console.log(userCode.code);
        if (userCode.code) {
          //发起网络请求
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx7b5d668466d6f342&secret=8d2b2c32775b672302c06c4b5a88bbd7&js_code=' + userCode.code + '&grant_type=authorization_code',
            data: {},
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function (res) {
              var openid = res.data.openid //返回openid
              // console.log('openid为' + openid);
              // console.log(userInfo.detail.userInfo);
              let userLoginInfo = userInfo.detail.userInfo;
              let localhost = getApp().globalData.localhost;
              //console.log('avatarUrl',userLoginInfo.avatarUrl);
              wx.request({
                url: 'http://' + localhost +'/Fun1/Home/Welcome/index', //存入用户信息接口
                data: {
                  userCode: userCode.code,
                  userOpenId: openid,
                  userAvatarUrl: userLoginInfo.avatarUrl,
                  userCity: userLoginInfo.city,
                  userCountry: userLoginInfo.country,
                  userGender: userLoginInfo.gender,
                  userLanguage: userLoginInfo.language,
                  userNickName: userLoginInfo.nickName,
                  userProvince: userLoginInfo.province
                },
                method: "POST",
                header: {
                  // 'content-type': 'application/json' // 默认值
                  'content-type': 'application/x-www-form-urlencoded' // 默认值
                },
                success(res) {
                  //console.log(res.data);
                  getApp().globalData.userOpenId = openid;
                   wx: wx.redirectTo({
                      url: '/pages/index/index',
                      success: function (res) { },
                      fail: function (res) { },
                      complete: function (res) { },
                    })
                }
              })
              
            }
          })
        }
        
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

  },
  
})