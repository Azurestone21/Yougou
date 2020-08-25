// pages/login/index.js
Page({
  async handleGetUserInfo(e) {
    // 获取用户信息
    const { userInfo } = e.detail;
    // 缓存登录信息
    wx.setStorageSync("userinfo", userInfo);
    // 返回 我的 页面
    wx.navigateBack({
      delta: 1
    });
  },
})