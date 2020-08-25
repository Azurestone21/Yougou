// 引入请求数据js文件
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品信息
    goodsInfo: {},
    // 商品是否被收藏
    isCollect: false
  },
  // 商品对象
  goodsObj: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { goods_id } = options;
    // console.log(goods_id);
    this.getGoodsInfo(goods_id);
  },

  // 获取商品信息
  async getGoodsInfo(goods_id) {
    const res = await request({ 
      url: "/goods/detail", 
      data: { goods_id } 
    });
    this.goodsObj = res;
    // console.log(res);
    // 获取缓存中的商品收藏的数组
    let collect = wx.getStorageSync("collect") || [];
    // 判断当前商品是否被收藏
    let isCollect = collect.some(v => v.goods_id === this.goodsObj.goods_id);
    this.setData({
      // goodsInfo: res
      // 避免传入无用数据
      goodsInfo: {
        goods_name: res.goods_name,
        goods_price: res.goods_price,
        // iphone部分手机 不识别 webp图片格式 
        // 最好找到后台 让他进行修改 
        // 临时自己改 确保后台存在 1.webp => 1.jpg 
        goods_introduce: res.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: res.pics
      },
      isCollect
    })
  },

  // 点击轮播图，查看大图
  handlePrevewImage(e) {
    console.log("点击图片")
    // 存储轮播图的图片
    let urls = this.goodsObj.pics.map(v => v.pics_mid);
    // 接收页面传递的图片url
    let current = e.currentTarget.dataset.url;
    // 预览大图
    wx.previewImage({
      current,
      urls,
    });
  },

  // 点击 加入购物车
  handleCartAdd() {
    // 获取缓存中的购物车数据
    let cart = wx.getStorageSync("cart") || [];
    // 判断 商品 是否已经存在于购物车数据中
    let index = cart.findIndex((v) => v.goods_id == this.goodsObj.goods_id);
    if(index == -1) {
      // 不存在
      this.goodsObj.num = 1;
      // 用于在购物车中勾选商品
      this.goodsObj.checked = true;
      cart.push(this.goodsObj);
    } else {
      // 存在
      cart[index].num++;
    }
    // 重置缓存
    wx.setStorageSync("cart", cart);
    // 弹窗
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      mask: true,
    });
  },

  // 收藏
  handleCollect() {
    let isCollect = false;
    // 获取缓存中的收藏数据
    let collect = wx.getStorageSync("collect") || [];
    // 判断商品是否被收藏
    let index = collect.findIndex(v => v.goods_id === this.goodsObj.goods_id);
    if(index == -1) {
      // 不存在
      collect.push(this.goodsObj);
      isCollect = true;
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      });
    } else {
      // 存在
      collect.splice(index,1);
      isCollect = false;
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true
      });
    }
    // 存入缓存
    wx.setStorageSync("collect", collect);
    // 修改data数据
    this.setData({
      isCollect
    })
  }
  
})