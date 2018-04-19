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

  favoritesPoetry: function (event) {
    var index = parseInt(event.currentTarget.dataset.item)
    var item = this.data.potries[index]
    this.data.potries.splice(index, 1)
    this.setData({
      potries: this.data.potries,
    })

    var param = new common.ParamPoem(item.id, getApp().globalData.userInfo.id, 0)
    var Option = {
      url: '/favour-poetry',
      data: param,
      method: 'POST',
      success: function (res) {
        console.log('success')
      },
      fail: function (res) {
        console.log('fail')
      },
      complete: function (res) {
        console.log('complete')
      }
    }
    common.request(Object.create(Option))
  },

  favoritesAuthor: function (event) {
    var index = parseInt(event.currentTarget.dataset.item)
    var item = this.data.authors[index]
    this.data.authors.splice(index, 1)
    this.setData({
      authors: this.data.authors,
    })

    var param = new common.ParamAuthor(item.id, getApp().globalData.userInfo.id, 0)
    var Option = {
      url: '/favour-author',
      data: param,
      method: 'POST',
      success: function (res) {
        console.log('success')
      },
      fail: function (res) {
        console.log('fail')
      },
      complete: function (res) {
        console.log('complete')
      }
    }
    common.request(Object.create(Option))
  },

  itemAuthorClick: function (event) {
    var url = '/pages/poemcatalogue/poemcatalogue?id=' + event.currentTarget.dataset.item.id
    wx.navigateTo({
      url: url,
    })
  },

  itemPoemClick: function (event) {
    var item = event.currentTarget.dataset.item
    var url = '/pages/poemdetails/poemdetails?id=' + item.id + '&author_name=' + item.author_name + '&content=' + item.content + '&title=' + item.title + '&isFav=1'
    wx.navigateTo({
      url: url,
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