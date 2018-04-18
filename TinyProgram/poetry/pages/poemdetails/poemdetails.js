var common = require('../../common.js')
var config = require('../../config.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    author:'',
    title:'',
    content:'',
    isFav:0,
    animation: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var contents = options.content;
    var old = '|'
    contents = contents.replace(/\|/g, '\n')
    this.setData({
      author : options.author_name,
      id : options.id,
      title : options.title,
      content : contents,
      isFav: options.isFav
    })
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

  favorites: function (event) {
    var len = parseInt(event.currentTarget.dataset.item)
    console.log(len)
    this.animation.scale(1.2).step()
    var fav = 0
    if (this.data.isFav == 1) {
      fav = 0
    } else {
      fav = 1
    }
    this.setData({
      isFav: fav,
      animation: this.animation.export(),
    })
    
    this.animation.scale(1).step()
    this.setData({
      animation: this.animation.export(),
    })

    var param = new common.ParamPoem(this.data.id, getApp().globalData.userInfo.id, fav)
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

})