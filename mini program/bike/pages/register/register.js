Page({
  /**
   * 页面的初始数据
   */
  data: {
    countryCodes: ["86", "80", "84", "87"],
    countryCodeIndex: 0,
    phoneNum: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  bindCountryCodeChange: function (e) {
    this.setData({
      countryCodeIndex: e.detail.value
    })
  },

  inputPhoneNum: function (e) {
    this.setData({
      phoneNum: e.detail.value
    })
  },

  genVerifyCode: function () {
    // 获取国家代码的索引
    var index = this.data.countryCodeIndex;
    // 获取索引取值
    var countryCode = this.data.countryCodes[index];
    // 获取输入的手机号
    var phoneNum = this.data.phoneNum;
    wx.request({
      // 小程序访问的网络请求协议必须是https，url里面不能有端口号
      url: "http://localhost:8080/user/genCode",
      data: {
        'countryCode': countryCode,
        'phoneNum': phoneNum
      },
      method: 'GET',
      success: function (res) {
        wx.showToast({
          title: '验证码已发送',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },

  formSubmit: function (e) {
    var phoneNum = e.detail.value.phoneNum
    var verifyCode = e.detail.value.verifyCode
    // 发送手机号和验证码进行校验
    wx.request({
      url: "http://localhost:8080/user/verify",
      // 修改请求头类型（因为默认的是json格式），为了让后台能接受String类型的data
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        phoneNum: phoneNum,
        verifyCode: verifyCode
      },
      method: "POST",
      success: function (res) {
        // 如果校验成功，那么就将手机信息保存到mongo中
        if (res.data) {
          wx.request({
            // 微信小程序生产环境请求的协议必须是https，地址必须是域名，不能带端口号
            url: "http://localhost:8080/user/register",
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            method: 'POST',
            data: {
              phoneNum: phoneNum,
              regDate: new Date(),
              status: 1
            },
            success: function(res) {
              if (res.data) {
                // 将手机号保存到到内存
                var globalData = getApp().globalData;
                globalData.phoneNum = phoneNum;
                globalData.status = 1;
                // 将手机号写入到手机的磁盘中
                wx.setStorageSync("phoneNum", phoneNum);
                wx.setStorageSync("status", 1);
                // 跳转到充值页面
                wx.navigateTo({
                  url: '../deposit/deposit',
                })
              } else {
                wx.showModal({
                  title: '提示',
                  content: '服务端错误，请稍后再试',
                })
              }
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '验证码有误，请重新输入！',
            showCancel: false
          })
        }
      }
    })
  }
})