// pages/collect/index.js
Page({

  data: {
    // 分类导航
    tabs: [
      {
        id: 0,
        title: "商品收藏",
        isActived: true
      },
      {
        id: 1,
        title: "品牌收藏",
        isActived: false
      },
      {
        id: 2,
        title: "店铺收藏",
        isActived: false
      },
      {
        id: 3,
        title: "浏览足迹",
        isActived: false
      }
    ],
    collect: []
  },

  onShow: function () {
    // 获取缓存中的收藏数据
    let collect = wx.getStorageSync("collect");
    this.setData({
      collect
    })
  },

  // 处理分类导航点击
  handleTabItemChange(e) {
    // console.log(e)
    // 获取点击的索引
    const {index} = e.detail;
    // 修改原数组
    let {tabs} = this.data;
    tabs.forEach((v,i) => i===index ? v.isActived=true : v.isActived=false);
    // 重新设置tabs数据
    this.setData({
      tabs
    })
  },
})