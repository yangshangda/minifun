var app = getApp()
Page({
  data: {
    num: 0,
    newList: [],
    toastHidden: true,
    TId: '',
    Title: '',
    Timg: '',
    AOption: '',
    Aimg: '',
    AOptionScore: '',
    BOption: '',
    Bimg: '',
    BOptionScore: '',
    COption: '',
    Cimg: '',
    COptionScore: '',
    DOption: '',
    Dimg: '',
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
    let localhost = getApp().globalData.localhost;
    let that = this;
    wx.request({
      url: 'http://' + localhost +'/Fun1/Home/Test/testList',//测试问卷列表接口
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
          TId: res.data[i].testnumber,
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
    let num = this.data.num
    let that = this;
    //let allscore = newlist.objects[i].detail.value
    //let Checked = this.data.Checked

    let qid = this.data.QId

    if (i<num) {
      that.setData({
        TId: newlist[i].testnumber,
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
    }else {
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