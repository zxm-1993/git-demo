// 为分类目录添加提交事件
$('#addCategory').on('submit', function () {
    // 获取表单提交的内容
    var formData = $(this).serialize();
    // 向服务器发送请求
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function (response) {
            // console.log(response);
            location.reload();
        },
        error: function (response) {
            console.log(response);
        }
    })
    // 阻止表单默认提交行为
    return false;
})

// 向服务器获取分类信息 分类信息展示功能
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        // console.log(response);
        // 将服务器返回的内容和模板字符串进行拼接
        var html = template('categoryListTpl', {
            data: response
        });
        // console.log(html);
        // 将数据写入页面
        $('#categoryBox').html(html);
    }
})

// 添加编辑按钮事件委托事件
$('#categoryBox').on('click', '.edit', function () {
    // alert(123);
    // 获取分类目录的id
    var id = $(this).attr('data-id');
    // console.log(id);
    // 向服务器查询这个id的信息
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function (response) {
            // console.log(response);
            // 获取模板字符串
            var html = template('modifyCategoryTpl', response);
            // console.log(html);
            // 将模板字符串写入页面
            $('#formBox').html(html);
        }
    })
})

// 当表单发生修改提交事件时
$('#formBox').on('submit', '#modifyCategory', function () {
    // alert(123);
    // 获取表单提交内容
    var formData = $(this).serialize();
    // 获取要修改的分类目标的id
    var id = $(this).attr('data-id');
    // console.log(id);
    // console.log(formData);
    // 向服务器发送请求 修改数据
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: formData,
        success: function (response) {
            // 修改成功后重新加载页面
            location.reload();
            // console.log(response);
        }
    })
    // 阻止默认提交事件
    return false;
})

// 分类数据删除 事件委托
$('#categoryBox').on('click', '.delete', function () {
    if (confirm('您真的要进行删除操作嘛？')) {
        var id = $(this).attr('data-id');
        // console.log(id);
        // 向服务器发送要删除的请求
        $.ajax({
            type:'delete',
            url:'/categories/'+id,
            success:function(response){
                // 删除成功后重新加载页面
                location.reload();
                // console.log(response);
            }
        })
    }
})