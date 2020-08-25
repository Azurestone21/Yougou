// 引入请求数据js文件
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左边菜单栏
    leftMenuList: [],
    // 右边商品数据
    rightProductList: [],
    // 点击的左侧菜单子项
    currentIndex: 0,
    // 右侧内容滚动条距离顶部的距离
    scrollTop: 0,
  },
  cate: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取缓存的数据
    const cates = wx.getStorageSync("cates");
    // 判断是否有缓存记录
    if (!cates) {
      // 发送请求
      this.getCates();
    } else {
      // 过期
      if (Date.now() - cates.time > 1000 * 10) {
        // 发送请求
        this.getCates();
      } else {
        // 缓存数据有用
        this.cates = cates.data;
        let leftMenuList = this.Cates.map(v => v.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },

  // 获取 左侧菜单栏数据
  async getCates() {
    // request({
    //   url: "/categories"
    // }).then((result) => {
    //   this.cate = result.data.message

    //   // 缓存数据
    //   wx.setStorageSync("cates", { time: Date.now(), data: this.cate })

    //   // 菜单数据
    //   let leftMenuList = this.cate.map(v => v.cat_name);
    //   // 初始化商品数据
    //   let rightProductList = this.cate[0].children;
    //   this.setData({
    //     leftMenuList,
    //     rightProductList
    //   })
    // })

    // async 属于 es7
    const res = await request({ url: "/categories" });
    this.cate = res;
    // 缓存数据
    wx.setStorageSync("cates", { time: Date.now(), data: this.cate })

    // 菜单数据
    let leftMenuList = this.cate.map(v => v.cat_name);
    // 初始化商品数据
    let rightProductList = this.cate[0].children;
    this.setData({
      leftMenuList,
      rightProductList
    })
  },

  // 菜单栏点击事件
  handleItemIndexTap(e) {
    // console.log(e)
    const { index } = e.currentTarget.dataset;
    // 根据点击子菜单获取商品数据
    let rightProductList = this.cate[index].children;
    this.setData({
      currentIndex: index,
      rightProductList,
      // 设置右侧内容距离顶部的距离
      scrollTop: 0
    })
  },
})