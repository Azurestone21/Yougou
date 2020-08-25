// 引入请求数据js文件
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

// pages/goods_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 分类导航
    tabs: [
      {
        id: 0,
        title: "综合",
        isActived: true
      },
      {
        id: 1,
        title: "销量",
        isActived: false
      },
      {
        id: 2,
        title: "价格",
        isActived: false
      }
    ],
    // 商品列表
    goodsList: [],
  },

  // 请求数据参数
  queryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },

  // 总页数
  totalPages: 1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.queryParams.cid = options.cid;
    this.queryParams.query = options.query||"";
    this.getGoodsList();
  },

  // 获取商品列表数据
  async getGoodsList() {
    const res = await request({
      url: "/goods/search",
      data: this.queryParams
    });
    // 获取数据数量
    let total = res.total;
    // 获取数据的数量
    this.totalPages = Math.ceil(total / this.queryParams.pagesize);
    // 重置数据列表数据，拼接新数据和旧数据
    this.setData({
      goodsList:[...this.data.goodsList,...res.goods]
    })

    // 关闭上拉加载的窗口
    wx.stopPullDownRefresh();
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

  // 页面触底事件
  onReachBottom: function () {
    // console.log("页面触底")
    if(this.queryParams.pagenum > this.totalPages) {
      // console.log("没有下一页数据")
      wx.showToast({
        title: '没有数据了',
        icon: 'none',
      });
    } else {
      // console.log("有下一页数据")
      this.queryParams.pagenum++;
      this.getGoodsList();
    }
  },

  // 下拉刷新
  onPullDownRefresh: function() {
    // console.log("上拉加载")
    // 清空商品列表数据
    this.setData({
      goodsList: []
    })
    // 页数重置为1
    this.queryParams.pagenum = 1;
    // 重新请求数据
    this.getGoodsList();
  }

})