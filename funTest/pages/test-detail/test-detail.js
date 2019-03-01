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
    ascore:0,
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
          Timg: res.data[i].testimg,
          AOption: res.data[i].atitle,
          Aimg: res.data[i].aimg,
          AOptionScore: res.data[i].ascore,
          BOption: res.data[i].btitle,
          Bimg: res.data[i].bimg,
          BOptionScore: res.data[i].bscore,
          COption: res.data[i].ctitle,
          Cimg: res.data[i].cimg,
          COptionScore: res.data[i].cscore,
          DOption: res.data[i].dtitle,
          Dimg: res.data[i].dimg,
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
        Timg: newlist[i].testimg,
        AOption: newlist[i].atitle,
        Aimg: newlist[i].aimg,
        AOptionScore: newlist[i].ascore,
        BOption: newlist[i].btitle,
        Bimg: newlist[i].bimg,
        BOptionScore: newlist[i].bscore,
        COption: newlist[i].ctitle,
        Cimg: newlist[i].cimg,
        COptionScore: newlist[i].cscore,
        DOption: newlist[i].dtitle,
        Dimg: newlist[i].dimg,
        DOptionScore: newlist[i].dscore,
        Checked: false,
        e: i + 1
      })
    } else {
      
      let allscore = this.data.allscore
      let QId = this.data.QId

      wx.showLoading({
        title: '数据分析中!',
      })
      setTimeout(function () {
        wx.hideLoading()
        wx.reLaunch({
          url: '../result/result?qid=' + QId + '&&allscore=' + allscore,
        })
      }, 1000)
    }
  },

  radioChange: function (e) {

    let ascore = e.detail.value
    let allscore = this.data.allscore
    this.setData({
      allscore: parseInt(ascore) + parseInt(allscore),
      ascore: ascore
    })
    console.log('all：', this.data.allscore)
  },

  last: function () {
    let that = this;
    let TId = that.data.TId
    if (TId==1) {
      wx.showToast({
        title: '已没有上一题',
        icon: 'none',
        duration: 1300,
      })
      return;
    }
    let ascore = that.data.ascore
    let allscore = that.data.allscore
    let newlist = that.data.newList
    let i = that.data.e - 2
    
    that.setData({
      allscore: parseInt(allscore) - parseInt(ascore),
      //Checked: false,
      TId: newlist[i].testnumber,
      Title: newlist[i].testtitle,
      Timg: newlist[i].testimg,
      AOption: newlist[i].atitle,
      Aimg: newlist[i].aimg,
      AOptionScore: newlist[i].ascore,
      BOption: newlist[i].btitle,
      Bimg: newlist[i].bimg,
      BOptionScore: newlist[i].bscore,
      COption: newlist[i].ctitle,
      Cimg: newlist[i].cimg,
      COptionScore: newlist[i].cscore,
      DOption: newlist[i].dtitle,
      Dimg: newlist[i].dimg,
      DOptionScore: newlist[i].dscore,
      Checked: false,
      e: i + 1
    })
    console.log(allscore)
    //that.findQuestion()
    // console.log('all：', this.data.allscore)
  },


})