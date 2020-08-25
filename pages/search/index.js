import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

// pages/search/index.js
Page({

  data: {
    // 查询出的商品数据
    goods: [],
    // 取消
    isFocus: false,
    // 输入的值
    inputValue: ""
  },

  TimeId: -1,

  handleInput(e) {
    // 获取输入框的值
    const { value } = e.detail;
    // 检测合法性
    if(!value.trim()) {
      // 没有值
      this.setData({
        goods: [],
        // 取消按钮不显示
        isFocus: false
      })
      // 值不合法
      return;
    }
    // 准备获取查询数据
    // 取消按钮显示
    this.setData({
      goods: [],
      isFocus: false
    })
    // 清除定时器
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(() => {
      this.search(value);
    },1000);
  },

  // 发送请求 获取数据
  async search(query) {
    const res = await request({
      url:"/goods/qsearch",
      data:{query}
    })
    this.setData({
      goods:res
    })
  },

  // 点击取消
  handleCancel() {
    this.setData({
      goods: [],
      isFocus: false,
      inputValue: ""
    })
  }
  
})