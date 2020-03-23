//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    name: '',
    gender: '男',
    genderItems:[
      {value: '男', checked: 'true'},
      {value:'女'}
    ],
    date:'',
    time:'',
    region: ['', '', ''],
    customItem: '全部',

    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindNameInput: function(e) {
    this.setData({
      name: e.detail.value
    })
  },
  radioChange: function(e) {
    this.setData({
      gender: e.detail.value
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },

  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },

  bindTest: function (e) {
    wx.request({
      url: 'http://192.168.1.6:8001/postdata',
      method: 'POST',
      header: { 'content-type': 'application/json' },
      data: {
        name: this.data.name,
        gender: this.data.gender,
        region: this.data.region,
        date: this.data.date,
        time: this.data.time
      },
      success: function (res) {
        console.log(res)// 服务器回包信息
      }
    })
    console.log('发送输入的信息：', this.data.name, this.data.gender, this.data.region, this.data.date, this.data.time)
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
