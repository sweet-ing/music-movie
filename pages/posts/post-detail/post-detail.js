var postsData = require('../../data/posts-data.js');
var app = getApp();

Page({
  data: {
    isPlayingMusic: false,
  },

  onLoad: function (options) {
    var globalData = app.globalData;

    var postId = options.id; // 获取路由传过来的postId
    this.data.currentPostId = postId;
    var postData = postsData.postList[postId];
    this.setData({postData: postData});

    var postsCollected = wx.getStorageSync('posts_Collected')
    if(postsCollected){
      var postCollected = postsCollected[postId]
      if (postCollected) {
        this.setData({ collected: postCollected });
      }
    }else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_Collected', postsCollected);
    }

    if(app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId) {
      this.setData({
        isPlayingMusic: true
      })
    }

    this.setAudioMonitor()
  },

  // 监听音乐的播放和暂停
  setAudioMonitor: function() {
    var that = this
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_currentMusicPostId = that.data.currentPostId;
    });
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    });
  },

  onCollectionTap: function (event) {
    var postsCollected = wx.getStorageSync('posts_Collected');
    var postCollected = postsCollected[this.data.currentPostId];
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    this.showToast(postsCollected,postCollected);
  },
  
  // 此方法只做学习在此不调用
  showModal: function (postsCollected, postCollected) {
    var that = this;
    // 确定模态框
    wx.showModal({
      title: '收藏',
      content: postCollected ? '确认收藏该文章？' : '确认取消收藏该文章？',
      showCancel: 'true',
      cancelText: '取消',
      confirmText: '确认',
      success: function(res) {
        if(res.confirm){
          // 更新缓存值
          wx.setStorageSync('posts_Collected', postsCollected);
          // 更新绑定值
          that.setData({ collected: postCollected })
        }
      }
    })
  },

  showToast: function (postsCollected, postCollected) {
    // 更新缓存值
    wx.setStorageSync('posts_Collected', postsCollected);
    // 更新绑定值
    this.setData({ collected: postCollected })
    // 用户通知
    wx.showToast({
      title: postCollected ? '收藏成功' : '取消成功',
      duration: 1000,
      icon: "success"
    })
  },

  onShareTap: function() {
    var itemList = [
      "分享给微信好友",
      "分享到朋友圈",
      "分享到微博",
      "分享到QQ",
    ]
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success: function(res) {
        // res.cancel 点击了取消
        // res.tapIndex 点击的元素itemList的序号
        wx.showModal({
          title: '您选择了' + res.cancel ? '取消' : itemList[res.tapIndex],
          content: '当前小程序暂不支持分享，您就放弃吧！',
        })
      }
    })
  },

  onMusicTap: function(event) {
    var isPlayingMusic = this.data.isPlayingMusic;
    var id = this.data.currentPostId;
    var postData = postsData.postList[id]
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({ isPlayingMusic: false });
    }else {
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg,
      })
      this.setData({ isPlayingMusic: true });
    }
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