// 封装获取地址和获取权限的API
import { getSetting,chooseAddress,openSetting,showModal,showToast } from '../../utils/asyncWx.js';
// 使用async
import regeneratorRuntime from '../../lib/runtime/runtime';

// pages/cart/index.js
Page({

  
  data: {
    // 地址对象
    address: {},
    // 缓存中的购物车数据
    cart: [],
    // 判断是否全选
    allChecked: false,
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
    // 设置address
    this.setData({
      address,
    })
    // 设置购物车状态
    this.setCart(cart);
  },

  // 获取地址
  async handleChooseAddress() {
    try {
      // 获取地址权限状态
      const res = await getSetting();
      const scopeAddress = res.authSetting["scope.address"];
      // 如果权限为false
      if(scopeAddress === false) {
        // 跳转到获取权限页面，API封装好的
        await openSetting();
      }
      // 获取地址信息
      let address = await chooseAddress();
      // 拼接地址信息
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
      // 缓存地址
      wx.setStorageSync("address", address);
    } catch (error) {
      console.log(error);
    }
  },

  // 商品选中
  handeItemChange(e) {
    // 获取 复选框 被点击的商品id
    let goods_id = e.currentTarget.dataset.id;
    // 获取购物车数据
    let { cart } = this.data;
    // 找到被修改的商品对象索引
    let index = cart.findIndex(v => v.goods_id === goods_id);
    // 选中状态取反
    cart[index].checked = !cart[index].checked;
    // 重置购物车状态
    this.setCart(cart);
  },

  // 商品全选
  handleItemAllChecked() {
    // 获取data中的数据
    let { cart,allChecked } = this.data;
    // 修改值
    allChecked = !allChecked;
    // 循环修改cart的选中状态
    cart.forEach(v => v.checked = allChecked);
    // 重置缓存数据
    this.setCart(cart);
  },

  // 加减商品数量
  async handleItemMunEdit(e) {
    // 获取传过来的商品id和加减操作
    let { operation, id } = e.currentTarget.dataset;
    // 获取购物车数据
    let { cart } = this.data;
    // 找到被修改的商品对象索引
    let index = cart.findIndex(v => v.goods_id === id);
    // 判断商品数量是否为0，为0就删除商品
    if(cart[index].num === 1 && operation === -1) {
      // 减为0，弹窗显示是否删除
      const res = await showModal({content:'您是否要删除该商品？'});
      if (res.confirm) {
        cart.splice(index, 1);
        // 重置缓存数据
        this.setCart(cart);
      } 
    } else {
        // 修改商品数量
        cart[index].num += operation;
        // 重置cart数据
        this.setCart(cart);
    }
    
  },

  // 结算
  async handleAllPay() {
    // 获取地址和商品数量
    const { address,totalNum } = this.data;
    // 判断是否有收货地址
    if(!address.userName) {
      await showToast({content:"您还没有选择收获地址！"});
      return;
    }
    // 判断是否有商品
    if(totalNum == 0) {
      await showToast({content:"您还没有选择商品！"});
      return;
    }
    // 跳转到 支付页面
    wx.navigateTo({
      url: '/pages/pay/index'
    });
  },

  // 设置购物车状态 重新计算 底部工具栏的数据
  // 全选 总价格 购买的数量
  setCart(cart) {
    // 遍历cart数组，全部商品checked为true，allChecked为true
    let allChecked = true;
    // 商品总数 总价
    let totalNum = 0;
    let totalPrice = 0;
    cart.forEach(v => {
      if(v.checked) {
        totalNum += v.num;
        totalPrice += v.num*v.goods_price;
      } else {
        allChecked = false;
      }
    });
    allChecked = cart.length != 0 ? allChecked : false;
    // 重置数据
    this.setData({
      cart,
      allChecked,
      totalNum,
      totalPrice
    })
    // 修改缓存中的购物车数据
    wx.setStorageSync("cart", cart);
  }

})