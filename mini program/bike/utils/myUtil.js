function get(key) {
  var value = wx.getStorageSync(key);
  if (!value) {
    value = getApp().globalData[key];
  }
  return value;
}

module.exports = {
  get
}