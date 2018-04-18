var common = require('../../common.js')
var config = require('../../config.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    potries: null,
    authors: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showNavigationBarLoading()
    var id = getApp().globalData.userInfo.id
    var url = '/myfavour/' + id
    var that = this;
    common.request({
      url: url,
      success: function (res) {
        console.log(res)
        wx.hideNavigationBarLoading()
        that.setData({
          potries: res.data.poetries,
          authors: res.data.authors
        });
      }
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