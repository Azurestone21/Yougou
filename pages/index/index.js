// 引入请求数据js文件
import { request } from "../../request/index";

//Page Object
Page({
  data: {
    // 轮播图
    swiperList: [],
    // 导航
    navList: [],
    // 分类
    sortList: []
  },
  //options(Object)
  onLoad: function (options) {
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result)=>{
    //     // console.log(result);
    //     this.setData({
    //       swiperList: result.data.message
    //     })
    //   }
    // });

    this.getSwiperList();
    this.getNavList();
    this.getSortList();
  },

  // 获取 轮播图数据
  getSwiperList() {
    request({
      url: "/home/swiperdata"
    }).then((result) => {
      this.setData({
        swiperList: result
      })
    })
  },

  // 获取 导航数据
  getNavList() {
    request({
      url: "/home/catitems"
    }).then((result) => {
      this.setData({
        navList: result
      })
    })
  },

  // 获取 分类数据
  getSortList() {
    request({
      url: "/home/floordata"
    }).then((result) => {
      this.setData({
        sortList: result
      })
    })
  },

});