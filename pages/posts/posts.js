// pages/posts/posts.js
var postsData = require('../data/posts-data.js') // 仅限相对路径

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 小程序总是会读取data对象来做数据绑定，这个动作我们称为动作A；而A的执行，是在onLoad函数执行之后发生的
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // ES6: 值和名字相同的时候可以把名字简化
    // this.setData({
    //   post_content
    // })

    // setData传的必须是一个JavaScript对象
    this.setData({
      posts_key: postsData.postList
    })

    // this.data.postList = postsData.postList
  },

  onPostTap: function(event){
    var postId = event.currentTarget.dataset.postid
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    })
  },

  // 用冒泡处理onSwiperItemTap方法
  onSwiperTap: function(event) {
    // target：当前点击的组件，值的是image
    // currentTarget：事件捕获的组件，值得是swiper
    var postId = event.target.dataset.postid
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    })
  },

  // 此方法以不用
  onSwiperItemTap: function(event) {
    var postId = event.currentTarget.dataset.postid
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    })
  }

})