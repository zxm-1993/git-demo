// 向服务器发送请求 获取随机推荐数据
$.ajax({
    type: 'get',
    url: '/posts/random',
    success: function (response) {
        // console.log(response);
        var randomTpl = `
        {{each data}}
        <li>
        <a href="detail.html?id={{$value._id}}">
          <p class="title">{{$value.title}}</p>
          <p class="reading">阅读({{$value.meta.views}})</p>
          <div class="pic">
            <img src="{{$value.thumbnail}}" alt="">
          </div>
        </a>
      </li>
      {{/each}}
        `;
        var html = template.render(randomTpl, {
            data: response
        });
        // console.log(html);
        $('#randomBox').html(html);

    }
})

// 从浏览器的地址栏中获取查询参数
function getUrlParams(name) {
    var paramsAry = location.search.substr(1).split('&');
    // 循环数组
    for (var i = 0; i < paramsAry.length; i++) {
        var temp = paramsAry[i].split('=');
        if (temp[0] == name) {
            return temp[1];
        }
    }
    return -1;
}
// 向服务器发送请求 获取最新评论
$.ajax({
    type: 'get',
    url: '/comments/lasted',
    success: function (response) {

    }
})

// 向服务器端发送请求 获取文章分类列表数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        // console.log(response);
        var navTpl = `
        {{each data}}
        <li>
        <a href="list.html?categoryId={{$value._id}}">
        <i class="fa {{$value.className}}"></i>{{$value.title}}
        </a>
        </li>
        {{/each}}
        `;
        var html = template.render(navTpl, {
            data: response
        });
        // console.log(html);
        $('#navBox').html(html);
        $('#topNavBox').html(html);
    }
})

// 点击搜索触发表单提交事件
$('.search form').on('submit', function () {
    // alert(1);
    var key = $(this).find('.keys').val();
    // alert(key);
    // 跳转到搜索页面
    location.href = 'search.html?keys=' + key;
    // 阻止表单默认提交
    return false;
})