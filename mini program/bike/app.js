//app.js
App({
  onLaunch: function () {
    
  },

  // 所有页面可以共享的数据
  globalData: {
    userInfo: null,
    // 记录用户的状态，0未注册，1绑定完手机了，2实名认证了
    status: 0,
    phoneNum: ''
  }
})