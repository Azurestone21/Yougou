import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
import { login } from "../../utils/asyncWx.js";

// pages/auth/index.js
Page({

  async handleGetUserInfo(e) {
    try {
      // 获取用户信息
      const { encryptedData, rawData, iv, signature } = e.detail;
      // 获取登录后的code
      const { code } = await login();
      // 请求参数
      const loginParams = { encryptedData, rawData, iv, signature, code};

      // 获取用户的token，只有小程序是企业小程序才可以
      // 发送请求 获取用户的token
      // const { token } = await request({
      //   url:"/users/wxlogin",
      //   data: loginParams,
      //   method:"post"
      // });
      // 把token存入缓存中 同时跳转回上一个页面
      // wx.setStorageSync("token", token);

      // 这个token是假的，只用于学习
      // wx.setStorageSync("token", "token");

      // wx.navigateBack({
      //   delta: 1
      // });
    } catch (error) {
      console.log(error);
    }
  }

})