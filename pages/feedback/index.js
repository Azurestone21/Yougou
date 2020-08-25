// pages/feedback/index.js
Page({

  data: {
    // 分类导航
    tabs: [
      {
        id: 0,
        title: "体验问题",
        isActived: true
      },
      {
        id: 1,
        title: "商品、商家投诉",
        isActived: false
      },
    ],
    // 文本框信息
    textValue: "",
    // 被选中的图片路径 数组
    chooseImgs: [],
  },
  // 外网图片路径
  upLoadImgs: [],
  
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

  // 获取文本框信息
  handleInputText(e) {
    // console.log(e)
    this.setData({
      textValue: e.detail.value
    })
  },

  // 选择图片
  handleChooseImg() {
    // 选择图片 API
    wx.chooseImage({
      // 同时选中图片的数量
      count: 9,
      // 图片格式 原图/压缩
      sizeType: ['original','compressed'],
      // 图片来源 相册/照相机
      sourceType: ['album','camera'],
      success: (result)=>{
        // console.log(result)
        // 存储图片
        this.setData({
          chooseImgs: [...this.data.chooseImgs,...result.tempFilePaths]
        })
      },
    });
  },

  // 删除图片
  handleRemoveImg(e) {
    const { index } = e.currentTarget.dataset;
    let { chooseImgs } = this.data;
    chooseImgs.splice(index,1);
    this.setData({
      chooseImgs
    })
  },

  // 提交
  handleSubmit() {
    const { textValue,chooseImgs } = this.data;
    // 文本框为空
    if(!textValue.trim()) {
      // 不合法
      wx.showToast({
        title: '请输入您的意见或建议',
        icon: 'none',
        mask: true,
      });
      return;
    }
    // 合法
    // 上传图片
    // 上传文件的 api 不支持 多个文件同时上传 遍历数组 挨个上传
    // 提示正在上传
    wx.showLoading({
      title: "正在上传中...",
      mask: true,
    });

    // 判断是否有图片需要上传
    // 上传不了，需要token
    if(chooseImgs.length != 0) {
      chooseImgs.forEach((v,i) => {
        wx.uploadFile({
          // 文件上传的路径
          url: 'http://images.ac.cn/api/upload',
          // 被上传文件的路径
          filePath: v,
          // 上传的文件的名称 后台来获取文件  file
          name: "file",
          // 文件信息
          formData: {},
          success: (result)=>{
            console.log(result)
            let url = JSON.parse(result.data).url;
            this.upLoadImgs.push(url);

            // 所有的图片都上传完毕了才触发  
            if (i === chooseImgs.length - 1) {
              wx.hideLoading();
              console.log("把文本的内容和外网的图片数组 提交到后台中");
              // 提交成功
              // 重置页面
              this.setData({
                textValue: "",
                chooseImgs: []
              })

              wx.showToast({
                title: '提交成功',
                icon: 'success',
                mask: true,
              });

            }
          },
        });
      })
    } else {
      // 关闭 正在上传 弹窗
      wx.hideLoading();
        
      console.log("只是提交了文本");

      // 重置页面
      this.setData({
        textValue: "",
        chooseImgs: []
      })
      
      wx.showToast({
        title: '提交成功',
        icon: 'success',
        mask: true,
      });
    }
  }
  
})