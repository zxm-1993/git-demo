// 获取地址栏中的key值
var key = getUrlParams('keys');
// alert(key);
// 向服务器发送请求 根据关键字调用搜索接口 获取搜索结果
$.ajax({
    type: 'get',
    url: '/posts/search/' + key,
    success:function(response){
        // console.log(response);
        var html=template('searchTpl',{
            data:response
        });
        // console.log(html);
        $('#listBox').html(html);
    }
})