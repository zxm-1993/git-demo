// 当用户选择图片的时候
$('#file').on('change', function () {
    // alert(1);
    var file = this.files[0];
    // console.log(file);
    // 创建一个空formData对象 上传图片(二进制)
    var formData = new FormData();
    formData.append('image', file);

    // 向服务器发送请求 图片上传
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            // console.log(response);
            $('#image').val(response[0].image);
        }
    })
})

// 当用户提交轮播图表单触发事件
$('#slidesForm').on('submit', function () {
    // 获取表单内容
    var formData = $(this).serialize();
    // 向服务器发送请求
    $.ajax({
        type: 'post',
        url: '/slides',
        data: formData,
        success: function () {
            location.reload();
        }
    })
    // 阻止表单默认提交行为
    return false;
})

// 向服务器发送请求 获取轮播图列表数据
$.ajax({
    type: 'get',
    url: '/slides',
    success: function (response) {
        // console.log(response);
        var html = template('slidesTpl', {
            data: response
        })
        // console.log(html);
        $('#slidesBox').html(html);

    }
})

// 当用户点击删除按钮的时候
$('#slidesBox').on('click', '.delete', function () {
    // alert(1);
    if (confirm('你真的要删除这个轮播图嘛?')) {
        // 获取要删除的轮播图id
        var id = $(this).attr('data-id');
        // alert(id);
        // 向服务器发送删除请求 实现删除轮播图功能
        $.ajax({
            type: 'delete',
            url: '/slides/' + id,
            success: function (response) {
                location.reload();
            }
        })
    }
})