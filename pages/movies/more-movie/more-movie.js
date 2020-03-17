var app = getApp();
var util = require('../../../utils/util.js')
Page({
  data: {
    navigateTitle: "",
  },
  onLoad: function (options) {
    var category = options.category;
    this.data.navigateTitle = category;
    var dataUrl = ""
    switch(category){
      case "正在热映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
        break;
      case "Top250":
        dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
        break;
    }
    util.http(dataUrl, this.processDoubanData)
  },

  processDoubanData: function (moviesDouban, settedKey, categoryTitle) {
    var movies = [];
    for (let i in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[i];
      var title = subject.title;
      if (title.length > 6) {
        title = title.substring(0, 6) + "...";
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

  onReady: function (event) {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle,
    })
  }
})