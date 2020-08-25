// 获取地址的API
export const getSetting = () => {
  return new Promise((resolve,reject) => {
    wx.getSetting({
      success: (result)=>{
        resolve(result);
      },
      fail: (err)=>{
        reject(err);
      }
    });
  })
}

// 获取地址的API
export const chooseAddress = () => {
  return new Promise((resolve,reject) => {
    wx.chooseAddress({
      success: (result)=>{
        resolve(result);
      },
      fail: (err)=>{
        reject(err);
      }
    });
  })
}

// 获取地址的API
export const openSetting = () => {
  return new Promise((resolve,reject) => {
    wx.openSetting({
      success: (result)=>{
        resolve(result);
      },
      fail: (err)=>{
        reject(err);
      }
    });
  })
}

// 弹窗 可以进行判断是否进行提示操作
export const showModal = ({content}) => {
  return new Promise((resolve,reject) => {
    wx.showModal({
      title: '提示',
      content: content,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
}

// 弹窗
export const showToast=({content})=>{
  return new Promise((resolve,reject)=>{
    wx.showToast({
      title: content,
      icon: 'none',
      success :(res) =>{
        resolve(res);
      },
      fail:(err)=>{
        reject(err);
      }
    })
  })
}

// 登录
export const login=()=>{
  return new Promise((resolve,reject)=>{
    wx.login({
      timeout:10000,
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      }
    });
  })
}

// 支付 普通小程序操作不了
export const requestPayment=(pay)=>{
  return new Promise((resolve,reject)=>{
   wx.requestPayment({
      ...pay,
     success: (result) => {
      resolve(result)
     },
     fail: (err) => {
       reject(err);
     }
   }); 
  })
}