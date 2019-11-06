// 获取密码修改的表单并添加提交事件
$('#modifyForm').on('submit', function () {
    // 获取用户在表单中输入的内容
    var formData = $(this).serialize();
    // 调用接口实现 向服务器发送请求 修改密码功能
    $.ajax({
        type: 'put',
        url: '/users/password',
        data: formData,
        success: function () {
            //修改成功返回登录页面
            location.href = '/admin/login.html';
        }
    })
    // 阻止默认表单提交行为
    return false;
})