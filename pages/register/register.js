// pages/register/register.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    motto:'晓序，欢迎您!',
    userName: '',
    userPassword:'',  
    userAddress:'',
    userTitle:'',
    userPhone:'',
    userEmail:'',
    id_token:'',
    response:'' //存取返回数据  
  },
  userNameInput: function (e) {
      console.log(e.detail.value +"姓名");
      this.setData({
          userName: e.detail.value  
      })
  },
  userPasswordInput:function(e) {
    this.setData({
    	    userPassword: e.detail.value  
    })
  }, 
  userPhonedInput:function(e){
          userPhone:e.detail.value
  } ,
  userTitleInput:function(e){
           userTitle:e.detail.value
  },
  userEmailInput:function(e){
            userEmail:e.detail.value
  },
  userAddressInput:function(e){
             userAddress:e.detail.value
  },
  logIn: function () {
    	    var that = this
    	    wx.request({
            url: 'http://192.168.1.100/XiaoXExpo/register/xcx_add.html',  
      	      data: {  
                username: this.data.userName,
                password: this.data.userPassword,
                useraddress: this.data.userAddress,
                usertitle: this.data.userTitle,
                userphone: this.data.userPhone,
                useremail: this.data.userEmail,
                idtoken: this.data.id_token
       	      },
            method: 'GET',
            success: function (res) {
                that.setData({
          	        id_token: res.data.id_token,
                    response:res  
                })
         try {
          	  //wx.setStorageSync('id_token', res.data.id_token)        
          } catch (e) { 
          }
          //跳转二维码页面
          wx.navigateTo({
           	   url: '../register/register'  
	        })
          console.log(res.data);
      },
      fail: function (res) {
          console.log(res.data);
       	  console.log('is failed')
      }  
	    })  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    this.setData({
      //获取传过来的值
      id_token: query.petId
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})