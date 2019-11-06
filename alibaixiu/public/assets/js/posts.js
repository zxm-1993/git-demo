// 向服务器端发送获取文章列表
$.ajax({
    type: 'get',
    url: '/posts',
    success: function (response) {
        // console.log(response);
        // 将模板和字符串进行拼接
        var html = template('postsTpl', response);
        // console.log(html);
        // 将模板字符串写入页面
        $('#postsBox').html(html);
        var page = template('pageTpl', response);
        // console.log(page);
        $('#pageBox').html(page);
    }
});

// 日期处理函数
function formatDate(date) {
    // 将字符串处理成日期格式
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

// 分页功能
function changePage(page) {
    // alert(page);
    // 向服务器端发送获取文章列表
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: page
        },
        success: function (response) {
            // console.log(response);
            // 将模板和字符串进行拼接
            var html = template('postsTpl', response);
            // console.log(html);
            // 将模板字符串写入页面
            $('#postsBox').html(html);
            var page = template('pageTpl', response);
            // console.log(page);
            $('#pageBox').html(page);
        }
    });

}

// 向服务器发送获取分类列表
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        // console.log(response);
        // 将模板和字符进行拼接
        var html = template('categoryTpl', {
            data: response
        });
        // console.log(html);
        // 将拼接好的模板写入页面
        $('#categoryBox').html(html);

    }
})

// 为过滤表单添加提交事件
$('#filterForm').on('submit', function () {
    // alert(1);
    // 向服务器发送请求 查询过滤出来的数据
    var formData = $(this).serialize();
    // console.log(formData);
    // 向服务器端发送获取文章列表
    $.ajax({
        type: 'get',
        url: '/posts',
        data: formData,
        success: function (response) {
            // console.log(response);
            // 将模板和字符串进行拼接
            var html = template('postsTpl', response);
            // console.log(html);
            // 将模板字符串写入页面
            $('#postsBox').html(html);
            var page = template('pageTpl', response);
            // console.log(page);
            $('#pageBox').html(page);
        }
    });
    // 阻止表单默认提交
    return false;
});

// 当用户点击删除按钮的时候触发点击事件
$('#postsBox').on('click', '.delete', function () {
    // 判断用户是否真的要删除
    if (confirm('你真的要删除这篇文章嘛？')) {
        // 获取文章id
        var id = $(this).attr('data-id');
        // alert(id);
        // 向服务器发送删除请求
        $.ajax({
            type: 'delete',
            url: '/posts/' + id,
            success: function () {
                location.reload();
            }
        })
    }
});