// 当用户选择图片的时候
$('#logo').on('change', function () {
    // 获取选择文件
    var file = this.files[0];
    // console.log(file);
    // 创建formData对象 实现二进制文件上传
    var formData = new FormData();
    formData.append('logo', file);
    // 向服务器端发送请求
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            // console.log(response);
            $('#hiddenLogo').val(response[0].logo);
            // 上传成功后显示图片
            $('#preview').attr('src',response[0].logo);
        }
    })
})

// 为网站设置表单发生提交行为的时候
$('#settingsForm').on('submit', function () {
    // 获取表单内容
    var formData = $(this).serialize();
    // 向服务器发送 实现网站设置数据添加功能
    $.ajax({
        type: 'post',
        url: '/settings',
        data: formData,
        success: function () {
            location.reload();
        }
    })
    // 阻止表单默认提交行为
    return false;
})

// 向服务器发送请求  获取网站设置数据
$.ajax({
    type:'get',
    url:'/settings',
    success:function(response){
        // console.log(response);
        if(response){
            // 将logo 存储在隐藏域中
            $('#hiddenLogo').val(response.logo);
            // 显示图片
            $('#preview').attr('src',response.logo);
            // 获取站点名称
            $('input[name="title"]').val(response.title);
            // 将是否开启评论功能显示在页面中
            $('input[name="comment"]').prop('checked',response.comment);
            // 将是否开启人工审核显示在页面中
            $('input[name="review"]').prop('checked',response.review);
        }
    }
})