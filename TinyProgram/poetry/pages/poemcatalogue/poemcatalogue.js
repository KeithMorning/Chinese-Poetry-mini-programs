var common = require('../../common.js')
var config = require('../../config.js');

Page({
// http://hs.izixia.cn:8000/poem/authors/1/poetry/
  /**
   * 页面的初始数据
   */
  data: {
    poems:[],
    url:'',
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showNavigationBarLoading()
    var that = this;
    var id = options.id;
    var _url = "/poetries/";
    if (id == -1 || id == '-1') {
      _url = "/poetries/";
    } else {
      _url = '/authors/' + options.id + '/poetry/';
    }
    common.request({
      url: _url,
      success: function (res) {
        wx.hideNavigationBarLoading()
        console.log(res.data);
        var list = res.data;
        if (!Array.isArray(list)) {
          list = res.data.results;
        }
        that.setData({
          poems: list,
        });
      }
    })
  },

  itemClick: function (event) {
    var item = event.currentTarget.dataset.item
    var url = '/pages/poemdetails/poemdetails?id=' + item.id + '&author_name=' + item.author_name + '&content=' + item.content + '&title=' + item.title + '&isFav=' + item.isFav
    wx.navigateTo({
      url: url,
    })
  },


  lower: function () {
    // wx.showToast({
    //   title: '已加载全部数据',
    // })
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