Page({
  onTap:function(){
    // console.log('onTap')
    
    // 路由

    // 有返回键 隐藏，执行onHide
    // wx.navigateTo({
    //   url: '../posts/posts'
    // })

    // 无返回键 销毁，执行onUnload
    // wx.redirectTo({
    //   url: '../posts/posts',
    // })

    // 带有tab栏页面只能用switchTab
    wx.switchTab({
      url: '../posts/posts',
    })
  },

  onUnload: function() {

  },

  onHide: function() {

  }

})