// 当表单发生提交行为的时
$('#userForm').on('submit', function () {
    // 获取用户在表单中输入的内容并将内容格式化成参数字符串
    var formData = $(this).serialize();
    // 向服务器发送添加用户的请求
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function () {
            // 重新刷新页面
            location.reload();
        },
        error: function () {
            alert('添加用户失败');
        }
    })
    // 阻止表单默认提交行为
    return false;
});

// 当用户选择文件上传功能时
$('#modifyBox').on('change', '#avatar', function () {
    // 用户选择到的文件
    // this.files[0]
    // console.log(this.files[0]);
    // 创建FormData对象
    var formData = new FormData();
    formData.append('avatar', this.files[0]);

    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 告诉$.ajax方法不要解析请求参数
        processData: false,
        // 告诉$.ajax方法不要设置请求参数的类型
        contentType: false,
        success: function (response) {
            // 请求成功后返回的结果是[{},{},...]
            // console.log(response);
            // 实现头像预览功能
            $('#preview').attr('src', response[0].avatar);
            $('#hiddenAvatar').val(response[0].avatar);
        }
    })

});

// 向服务器端发送请求 索要用户列表数据
$.ajax({
    type: 'get',
    url: '/users',
    success: function (response) {
        // console.log(response);
        // 使用模板引擎将数据和HTML字符串进行拼接
        var html = template('userTpl', {
            data: response,
        });
        // console.log(html);
        // 将拼接好的字符串显示在页面中
        $('#userBox').html(html);
    }
});

// 利用事件委托添加编辑点击事件
$('#userBox').on('click', '.edit', function () {
    // alert(123);
    // 获取id
    var id = $(this).attr('data-id');
    // alert(id);
    // 向服务器端发送请求
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function (response) {
            // console.log(response);
            var html = template('modifyTpl', response);
            // console.log(html);
            $('#modifyBox').html(html);
        }
    })
});

// 为修改表单提交事件
$('#modifyBox').on('submit', '#modifyForm', function () {
    // alert(123);
    var formData = $(this).serialize();
    // console.log(formData);
    var id = $('#modifyForm').attr('data-id');
    // console.log(id);

    // 向服务器端发送
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formData,
        success: function (response) {
            // console.log(response);
            // 修改成功重新加载
            location.reload();
        }
    })
    // 阻止表单默认提交
    return false;
});

// 点击删除按钮删除用户
$('#userBox').on('click', '.delete', function () {
    // 判断用户是否真的要删除
    if (confirm('是否要删除用户')) {
        // alert(111)
        // 获取用户id
        var id = $(this).attr('data-id');
        // alert(id);
        // 向服务器发送请求
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function (response) {
                // console.log(response);
                // 页面重新加载
                location.reload();
            }
        })
    }
});

// 获取全选按钮
var selectAll = $('#selectAll');

// 获取批量删除按钮
var deleteMany = $('#deleteMany');

// 点击选按钮 下面的小复选框也勾选
selectAll.on('change', function () {
    // 获取全选按钮的状态 prop方法
    var status = $(this).prop('checked');
    // alert(status);
    // 获取到所有用户并将用户的状态和全选按钮保持一致
    $('#userBox').find('input').prop('checked', status);
    // 判断全选按钮是否选中  是就显示批量按钮 否就不显示批量按钮
    if (status) {
        // 显示批量按钮
        deleteMany.show();
    } else {
        // 否就不显示批量按钮
        deleteMany.hide();
    }
});

// 当用户前面的复选框状态发生改变时
$('#userBox').on('change', '.userStatus', function () {
    // 获取到所有用户 在所有用户中过滤选中的用户
    // 所有用户总数和选中总数是否一致
    // 如果一致 就是说明所有的用户都是选中
    // 否则 就是用户没有被选中
    // 获取所有用户框的总数
    var inputs = $('#userBox').find('input');
    if (inputs.length == inputs.filter(':checked').length) {
        // alert('用户复选框数量和勾选的一致');
        selectAll.prop('checked', true);
    } else {
        // alert('用户复选框数量和勾选的不一致');
        selectAll.prop('checked', false);
    }
    // 判断用户选中的数量大于0就显示
    if (inputs.filter(':checked').length > 0) {
        deleteMany.show();
    } else {
        deleteMany.hide();
    }
});

// 批量删除用户
deleteMany.on('click', function () {
    // 存放id数组
    var ids = [];
    // 选中用户
    var userChecked = $('#userBox').find('input').filter(':checked');
    userChecked.each(function (index, element) {
        ids.push($(element).attr('data-id'));
    })
    // console.log(ids);
    // 向服务器发送请求
    if (confirm('您真的要确认进行批量删除操作嘛?')) {
        $.ajax({
            type: 'delete',
            url: '/users/' + ids.join('-'),
            success: function () {
                // 删除成功页面重新加载
                location.reload();
            }
        })
    }
})