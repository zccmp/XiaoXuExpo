// pages/mylist.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
       {url:'http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg'} ,
       {url:'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg'} ,
       {url:'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg'} ,
       {url:'http://img02.tooopen.com/images/20141231/sy_78327074576.jpg'}
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,  
    username: '晓序，欢迎您!',
    id_key: '',//ID，很重要 方便存在本地的locakStorage 
    nodata: null,
    feedMyList: [],
    zcity:null,
    zprovice:null,
    city:null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    //获取当前经纬度信息
    wx.getLocation({
      success: ({ latitude, longitude }) => {
        //调用后台API，获取地址信息
        wx.request({
          url: 'http://192.168.1.101/XiaoXExpo/register/xcx_city.html',
          data: {
            latitude: latitude,
            longitude: longitude
          },

          success: (res) => {
            //console.log(res.data.name + "--vs--");
            //console.log(res.data.value + "--vc--");
            that.setData({city: res.data.value+"•"+res.data.name})
            wx.setStorageSync('zprovice', res.data.value) 
            wx.setStorageSync('zcity', res.data.name)  
          },
          fail: () => {
            console.log("城市调用异常");
            that.setData({ city: "获取城市定位失败" });  
          },
          complete: () => {
            console.log("城市调用完成");
          }
        })
      }
    });
    //console.log(wx.getStorageSync("zcity")+"--1--");
    //console.log(wx.getStorageSync("zprovice") + "--2--");
    //获取数据列表
    wx.request({
      url: 'http://192.168.1.101/XiaoXExpo/register/xcx_list.html',
      data: { 'city': wx.getStorageSync("zcity"), 'province': wx.getStorageSync("zprovice")},
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        //console.log(res.data.success);
        that.setData({
          nodata: res.data.success,
          feedMyList: res.data.userList
        });
      },
      fail: function () {
        console.log("数据调用异常");
        that.setData({feedMyList: "获取数据列表失败" });  
      },
      complete: function () {
        console.log("数据调用完成");
      }
    });
  },

  //单击跳转到预登记方法
  navToPetDet: function (event) {
    //console.log(event.currentTarget.dataset.petid+"--vs---");
    let petId = event.currentTarget.dataset.petid 
    wx.navigateTo({
        url: '../register/register?petId='+petId  
     })
  }
})