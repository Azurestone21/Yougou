import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

// pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 分类导航
    tabs: [
      {
        id: 0,
        title: "全部",
        isActived: true
      },
      {
        id: 1,
        title: "代付款",
        isActived: false
      },
      {
        id: 2,
        title: "代发货",
        isActived: false
      },
      {
        id: 3,
        title: "退款/退货",
        isActived: false
      }
    ],
    orders: [],
  },

  onShow: function () {
    // 获取授权
    let token = wx.getStorageSync("token");
    if(!token) {
      wx.navigateTo({
        url: '/pages/auth/index',
      });
      return;
    }

    // 因为onShow不能直接获取options，需要用其他方法获取
    // 获取当前的小程序页面栈（数组）
    var pages =  getCurrentPages();
    // 索引最大的是当前页面
    let currentPage = pages[pages.length-1];
    // 获取url上的type参数
    const { type } = currentPage.options;
    // 激活选中页面标题
    this.changeTitleByIndex(type-1);
    this.getOrders(type);
  },

  // 处理分类导航点击
  handleTabItemChange(e) {
    // 获取点击的索引
    const { index } = e.detail;
    this.changeTitleByIndex(index);
    // 2 重新发送请求 type=1 index=0
    this.getOrders(index+1);
  },

  changeTitleByIndex(index) {
    // 修改原数组
    let {tabs} = this.data;
    tabs.forEach((v,i) => i===index ? v.isActived=true : v.isActived=false);
    // 重新设置tabs数据
    this.setData({
      tabs
    })
  },

  // 获取订单列表的方法
  async getOrders(type) {
    const res = await request({ url: "/my/orders/all", data: { type } });
    console.log(res);
    // this.setData({
    //   orders: res.orders.map(v=>({...v,create_time_cn:(new Date(v.create_time*1000).toLocaleString())}))
    // })
  },

})