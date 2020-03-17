// pages/movies/movies.js
var util = require('../../utils/util.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let url = app.globalData.doubanBase
    var inTheatersUrl = url + "/v2/movie/in_theaters" + "?start=0&count=3";
    var comingSoonUrl = url + "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = url + "/v2/movie/top250" + "?start=0&count=3";
    this.getMovieListData(inTheatersUrl,"inTheaters","正在热映")
    this.getMovieListData(comingSoonUrl,"comingSoon","即将上映")
    this.getMovieListData(top250Url,"top250","Top250")
  },

  getMovieListData: function (url, settedKey, categoryTitle) {
    let that = this
    wx.request({
      url: url,
      method: "GET",
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        that.processDoubanData(res.data, settedKey, categoryTitle)
      },
      fail: function (res) {
       
      }
    })
  },

  processDoubanData: function (moviesDouban, settedKey, categoryTitle) {
    var movies = [];
    for (let i in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[i];
      var title = subject.title;
      if(title.length > 6) {
        title = title.substring(0,6) + "...";
      }
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    var readyData = {};
    readyData[settedKey] = {
      categoryTitle: categoryTitle,
      movies: movies
    };
    this.setData(readyData)
  },

  onMoreTap: function(event) {
    let category = event.currentTarget.dataset.category
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + category,
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