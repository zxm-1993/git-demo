 // 从地址栏中获取文章id
 var postId = getUrlParams('id');
 // 评论是否经过人工审核
 var review;

 // 向服务器发送请求 根据文章id获取文章详细信息
 $.ajax({
     type: 'get',
     url: '/posts/' + postId,
     success: function (response) {
         //  console.log(response);
         var html = template('postTpl', response);
         //  console.log(html);
         $('#article').html(html);
     }
 })

 // 当点击文章详情页中的赞时 触发点击事件
 $('#article').on('click', '#like', function () {
     //  alert(1);
     // 向服务器发送点赞请求 
     $.ajax({
         type: 'post',
         url: '/posts/fabulous/' + postId,
         success: function () {
             alert('点赞成功！感谢您的支持！！');
         }
     })
 })

 // 向服务器发送请求 获取网站配置信息
 $.ajax({
     type: 'get',
     url: '/settings',
     success: function (response) {
         review = response.review;
         // 如果网站配置开启评论功能就显示评论功能
         if (response.comment) {
             var html = template('commentTpl');
             $('#comment').html(html)
         }
     }
 })

 // 当评论表单发生提交行为的时候
 $('#comment').on('submit', 'form', function () {
     //  alert(1);
     // 获取用户输入的内容
     var content = $(this).find('textarea').val();
     // 代表评论状态
     var state;
     //  alert(content);
     if (review) {
         // 要经过人工审核 未审核
         state = 0;

     } else {
         // 不要经过人工审核  已经审核
         state = 1;
     }
     $.ajax({
         type:'get',
         url:'/comments',
         data:{
            content:content,
            post:postId,
            state:state,
         },
         success:function(){
             alert('评论成功');
             location.reload();
         },
         error:function(){
             alert('评论失败')
         }
     })
     // 阻止表单默认提交
     return false;
 })