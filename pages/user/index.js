// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 登录用户信息
    userInfo: {},
    // 收藏
    collectNum: 0,
  },

  onShow: function() {
    // 获取用户信息
    let userInfo = wx.getStorageSync("userinfo");
    // 获取缓存中的收藏数据
    let collect = wx.getStorageSync("collect") || [];
    this.setData({
      userInfo,
      collectNum: collect.length
    })
  },

  async handleGetUserInfo(e) {
      // 获取用户信息
      console.log(e.detail.userInfo);
  },

  
})