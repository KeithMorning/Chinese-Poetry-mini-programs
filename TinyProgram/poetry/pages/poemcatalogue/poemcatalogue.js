var common = require('../../common.js')
var config = require('../../config.js');
var _url
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
    _url = "/poetries/";
    if (id == -1 || id == '-1') {
      _url = "/poetries/";
    } else {
      _url = '/authors/' + options.id + '/poetry_list/';
    }
    common.request({
      url: _url,
      success: function (res) {
        wx.hideNavigationBarLoading()
        console.log(res.data);
        var list = res.data.results;
        var url1 = res.data.next;
        that.setData({
          poems: list,
          url: url1
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


  upper: function () {
    wx.showNavigationBarLoading()
    var that = this;
    common.request({
      url: _url,
      success: function (res) {
        wx.hideNavigationBarLoading()
        that.setData({
          url: res.data.next,
          poems: res.data.results,
        });
      }
    });
  },

  lower: function () {
    wx.showNavigationBarLoading();
    var that = this;
    that.nextLoad();
  },

  nextLoad: function () {
    var that = this;

    common.request({
      url: this.data.url,
      success: function (res) {
        console.log(res.data);
        wx.hideNavigationBarLoading();
        that.setData({
          poems: that.data.poems.concat(res.data.results),
          url: res.data.next,
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
    
  }
})