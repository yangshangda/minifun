var app = getApp()
Page({
  data: {
    num: 0,
    newList: [],
    toastHidden: true,
    TId: '',
    Title: '',
    AOption: '',
    AOptionScore: '',
    BOption: '',
    BOptionScore: '',
    COption: '',
    COptionScore: '',
    DOption: '',
    DOptionScore: '',
    Checked: false,
    e: 0,
    allscore: 0,
    QId: 0,
  },
  onLoad: function (options) {
    this.question(options.questionid);

  },

  /*初始只调用一次，给newList[]赋值，这时已经确定QId */
  question(questionid) {
    let i = this.data.e
    let that = this;
    wx.request({
      url: 'http://localhost/Fun1/Home/Test/testList',//测试问卷列表接口
      data: { questionid: questionid},
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log('data2:', res.data);
        that.setData({
          num: res.data.length,
          newList: res.data,
          QId: questionid,
          TId: res.data[i].testnumbe,
          Title: res.data[i].testtitle,
          AOption: res.data[i].atitle,
          AOptionScore: res.data[i].ascore,
          BOption: res.data[i].btitle,
          BOptionScore: res.data[i].bscore,
          COption: res.data[i].ctitle,
          COptionScore: res.data[i].cscore,
          DOption: res.data[i].dtitle,
          DOptionScore: res.data[i].dscore,
          Checked: false,
          e: i + 1
        })
      }
    })


    //console.log('res.data.objects', res.data)
    // that.setData({
    //   num: res.data.objects.length,
    //   newList: res.data,
    //   QId: Q,
    //   TId: res.data.objects[i].TId,
    //   Title: res.data.objects[i].Title,
    //   AOption: res.data.objects[i].AOption,
    //   AOptionScore: res.data.objects[i].AOptionScore,
    //   BOption: res.data.objects[i].BOption,
    //   BOptionScore: res.data.objects[i].BOptionScore,
    //   COption: res.data.objects[i].COption,
    //   COptionScore: res.data.objects[i].COptionScore,
    //   DOption: res.data.objects[i].DOption,
    //   DOptionScore: res.data.objects[i].DOptionScore,
    //   Checked: false,
    //   e: i + 1
    // });



  },

  //radiogroup 触发函数
  findQuestion() {
    let i = this.data.e
    let newlist = this.data.newList
    //let allscore = newlist.objects[i].detail.value
    //let Checked = this.data.Checked

    let qid = this.data.QId


    if (i < 20) {
      this.setData({
        TId: newlist[i].testnumbe,
        Title: newlist[i].testtitle,
        AOption: newlist[i].atitle,
        AOptionScore: newlist[i].ascore,
        BOption: newlist[i].btitle,
        BOptionScore: newlist[i].bscore,
        COption: newlist[i].ctitle,
        COptionScore: newlist[i].cscore,
        DOption: newlist[i].dtitle,
        DOptionScore: newlist[i].dscore,
        Checked: false,
        e: i + 1

      })
    } else {
      let allscore = this.data.allscore
      let MyUser = new wx.BaaS.User()
      let currentUser = MyUser.getCurrentUserWithoutData()
      let tableID = 34112
      let Product = new wx.BaaS.TableObject(tableID)

      let allscore1 = Math.round(allscore * 1.25)    //qid=1的总分计算方式:把20题的得分相加为粗分，粗分乘以1.25，四舍五入取整数，即得到标准分。
      //qid==1 判断分数结果-------------------------------------------
      if (allscore1 < 52) {               //52以下为正常
        Product.find().then(res => {
          let result = res.data.objects[0].Result     //0为结果id
          //console.log('res.data.objects', result)

          currentUser.set('AllScore', allscore1)
          currentUser.set('Result', result)
          // age 为自定义字段
          currentUser.update().then(res => {
            // success
          }, err => {
            // err
          })
        }, err => {
          // err
        })

      } else if (allscore1 >= 53 && allscore1 <= 62) {      //53-62为轻度抑郁
        Product.find().then(res => {

          let result = res.data.objects[1].Result    //1为结果id
          //console.log('res.data.objects', result)

          currentUser.set('AllScore', allscore1)
          currentUser.set('Result', result)
          // 自定义字段
          currentUser.update().then(res => {
            // success
          }, err => {
            // err
          })

        }, err => {
          // err
        })
      } else if (allscore1 >= 63 && allscore1 <= 72) {       //63-72为中度抑郁
        Product.find().then(res => {

          let result = res.data.objects[2].Result    //1为结果id
          //console.log('res.data.objects', result)

          currentUser.set('AllScore', allscore1)
          currentUser.set('Result', result)
          // 自定义字段
          currentUser.update().then(res => {
            // success
          }, err => {
            // err
          })

        }, err => {
          // err
        })
      } else {                                         //72分以上为重度抑郁
        Product.find().then(res => {

          let result = res.data.objects[3].Result    //1为结果id
          //console.log('res.data.objects', result)

          currentUser.set('AllScore', allscore1)
          currentUser.set('Result', result)
          // 自定义字段
          currentUser.update().then(res => {
            // success
          }, err => {
            // err
          })

        }, err => {
          // err
        })
      }

      wx.showLoading({
        title: '数据分析中!',
      })
      setTimeout(function () {
        wx.hideLoading()
        wx.reLaunch({
          url: '../user/user',
        })
      }, 1000)
    }


  },

  radioChange: function (e) {

    let ascore = e.detail.value
    let allscore = this.data.allscore
    this.setData({
      allscore: parseInt(ascore) + parseInt(allscore)
    })
    console.log('all：', this.data.allscore)
  },


})