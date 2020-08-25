
import { showToast, requestPayment } from "../../utils/asyncWx.js";
// 使用async
import regeneratorRuntime from '../../lib/runtime/runtime';
import { request } from "../../request/index.js";

// pages/cart/index.js
Page({
  
  data: {
    // 地址对象
    address: {},
    // 缓存中的购物车数据
    cart: [],
    // 选择的商品总数
    totalNum: 0,
    // 选中的商品总价格
    totalPrice: 0
  },

  onShow: function () {
    // 获取缓存中的地址
    let address = wx.getStorageSync("address");
    // 获取缓存中的购物车数据
    let cart = wx.getStorageSync("cart") || [];
    // 过滤出 checked=true 的商品
    cart = cart.filter(v=>v.checked);
     // 商品总数 总价
     let totalNum = 0;
     let totalPrice = 0;
     cart.forEach(v => {
        totalNum += v.num;
        totalPrice += v.num*v.goods_price;
     });
     // 重置数据
     this.setData({
       cart,
       totalNum,
       totalPrice,
       address
     })
  },

  // 确认 付款
  async handleOrderPay() {
    try {
      // 获取缓存中的 token
      const token = wx.getStorageSync("token");
      // 判断是否有token
      if(!token) {
        wx.navigateTo({
          url: '/pages/auth/index',
        });
        return;
      }
      // 创建订单
      // 1 请求头 Authorization: token 
      // 2 请求参数
      // const order_price = this.data.totalPrice;
      // const consignee_addr = this.data.address.all;
      // const cart = this.data.cart;
      // let goods = [];
      // cart.forEach(v => goods.push({
      //   goods_id: v.goods_id,
      //   goods_number: v.num,
      //   goods_price: v.goods_price
      // }))
      // const orderParams = { order_price, consignee_addr, goods };
      // 3 准备发送请求 创建订单 获取订单编号
      // const { order_number } = await request({ url: "/my/orders/create", method: "POST", data: orderParams });
      // 4 发起 预支付接口
      // const { pay } = await request({ url: "/my/orders/req_unifiedorder", method: "POST", data: { order_number } });
      // 5 发起微信支付 
      // await requestPayment(pay);
      // 6 查询后台 订单状态
      // const res = await request({ url: "/my/orders/chkOrder", method: "POST", data: { order_number } });

      // 弹窗
      await showToast({ content: "支付成功" });

      // 删除已购买商品的缓存
      let newCart = wx.getStorageSync("cart");
      newCart = newCart.filter(v=>!v.checked);
      wx.setStorageSync("cart", newCart);

      // 跳转到订单页面
      wx.navigateTo({
        url: '/pages/order/index',
      });

    } catch (error) {
      // 弹窗
      await showToast({ content: "支付失败" })
      console.log(error);
    }
  }
})