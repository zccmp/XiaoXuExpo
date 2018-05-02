// pages/mylist.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    username: '晓序，欢迎您!',
    id_key: '',//ID，很重要 方便存在本地的locakStorage 
    nodata: null,
    deptMyList: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    //获取数据列表
    wx.request({
      url: 'http://192.168.1.101/XiaoXExpo/register/xcx_service.html',
      data: {'deptType':'0'},
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        //console.log(res.data.success);
        that.setData({
          nodata: res.data.success,
          deptMyList: res.data.deptList
        });
      },
      fail: function () {
        console.log("数据调用异常");
        that.setData({ feedMyList: "获取数据列表失败" });
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
      url: '../register/register?petId=' + petId
    })
  }
})