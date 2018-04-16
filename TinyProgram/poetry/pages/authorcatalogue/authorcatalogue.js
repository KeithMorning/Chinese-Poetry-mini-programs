var common = require('../../common.js')

class Param {
  constructor(author_id, user_id, favour) {
    this.author_id = author_id;
    this.user_id = user_id;
    this.favour = favour;
  }

  toString() {
    return "{'author_id':" + this.author_id + ",'user_id':" + this.user_id + ",`favour`:" + this.favour + "}`"
  }
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    plist: [],
    plist_length : 0,
    url : 'http://hs.izixia.cn:8000/poem/authors/',
    animation:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //loadAuthorData();
    var id = options.cls;
    var url = 'http://hs.izixia.cn:8000/poem/authors?dynasty=T';
    if (id == 1) {
      url = 'http://hs.izixia.cn:8000/poem/authors?dynasty=T';
    } else if (id == 2) {
      url = 'http://hs.izixia.cn:8000/poem/authors/?dynasty=S';
    } else if (id == 3) {
      url = 'http://hs.izixia.cn:8000/poem/poetries/';
    }
    var that = this;
    const task = wx.request({
      url: url,
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
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.animation = wx.createAnimation({
      timingFunction: 'ease-in-out',
      duration: 500
    })

    
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

  itemClick: function(event) {
    var url = '/pages/poemcatalogue/poemcatalogue?id=' + event.currentTarget.dataset.item.id
    wx.navigateTo({
      url: url,
    })
  },

  favorites: function(event) {
    var len = parseInt(event.currentTarget.dataset.item)
    console.log(this.data.plist[len])
    var isFev = this.data.plist[len].isFav
    this.animation.scale(1.5).step()
    var animations = Array(len+1)
    animations[len] = this.animation.export()
    var fav = 0
    if (isFev) {
      fav = 0
      this.data.plist[len].isFav = false
    } else {
      fav = 1
      this.data.plist[len].isFav = true
    }
    this.setData({
      animation: animations,
      plist: this.data.plist,
    })

    this.animation.scale(1).step()
    animations[len] = this.animation.export()
    this.setData({
      animation: animations,
    })

    var param = new Param(this.data.plist[len].id, getApp().globalData.userInfo.id, fav)
    var Option = {
      url: '/favour-author',
      data: param,
      method: 'POST',
      success: function(res) {
        console.log('success')
      },
      fail: function(res) {
        console.log('fail')
      },
      complete: function(res) {
        console.log('complete')
      }
    }
    common.request(Object.create(Option))
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