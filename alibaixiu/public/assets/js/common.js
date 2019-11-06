$('#logout').on('click', function () {
  var isConform = confirm('确认要退出登录嘛');
  if (isConform) {
    $.ajax({
      type: 'post',
      url: '/logout',
      success: function () {
        location.href = 'login.html';
      },
      error: function () {
        // 错误时服务器返回的结果
      }
    })
  }
})

// 向服务器发送请求 获取用户登录信息
$.ajax({
  type: 'get',
  url: '/users/' + userId,
  success:function(response){
    // console.log(response);
    // 设置主页头像图片
    $('.avatar').attr('src',response.avatar);
    // 设置昵称
    $('.profile .name').html(response.nickName);
  }
})