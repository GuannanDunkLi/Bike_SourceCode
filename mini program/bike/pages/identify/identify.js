var myUtil = require('../../utils/myUtil.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
  
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

  formSubmit: function(e) {
    // 获取全局变量的数据
    var globalData = getApp().globalData;
    // 获取手机号
    var phoneNum = myUtil.get('phoneNum');
    // 获取姓名和身份证号
    var name = e.detail.value.name;
    var idNum = e.detail.value.idNum;
    wx.request({
      url: 'http://localhost:8080/user/identify',
      data: {
        phoneNum: phoneNum,
        name: name,
        idNum: idNum,
        status: 3
      },
      method: 'POST',
      success: function(res) {
        globalData.status = 3;
        wx.setStorageSync('status', 3);
        // 完成所有注册流程，跳转到首页
        wx.navigateTo({
          url: '../index/index',
        });
      }
    })
  }
})