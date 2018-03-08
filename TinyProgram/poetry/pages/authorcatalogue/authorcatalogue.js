Page({

  /**
   * 页面的初始数据
   */
  data: {
    plist: [],
    plist_length : 0,
    url : 'http://hs.izixia.cn:8000/poem/authors/',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //loadAuthorData();
    var that = this;
    const task = wx.request({
      url: 'http://hs.izixia.cn:8000/poem/authors/',
      // url: 'http://www.baidu.com',
      data: {},
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          url: res.data.next,
          plist: res.data.results,
          plist_length: res.data.results.length,
        });
      }
    })

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
    
  },

  lower: function() {
    wx.showNavigationBarLoading();
    var that = this;
    that.nextLoad();
  },

  nextLoad: function() {
    var that = this;
    const task = wx.request({
      url: that.data.url,
      data: {},
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        wx.hideNavigationBarLoading();
        that.setData({
          plist: that.data.plist.concat(res.data.results),
          plist_length: that.data.plist_length + res.data.results.length,
          url: res.data.next,
        });
      }
    })
  }
})