// 向服务器端发送请求 索要热门推荐数据
$.ajax({
    type: 'get',
    url: '/posts/recommend',
    success: function (response) {
        // console.log(response);
        // 为了将模板变成公共的，所以将模板写在了js文件中
        var recommendTpl = `     
        {{each data}}
        <li>
        <a href="detail.html?id={{$value._id}}">
          <img src="{{$value.thumbnail}}" alt="">
          <span>{{$value.title}}</span>
        </a>
      </li>
      {{/each}}`;
        var html = template.render(recommendTpl, {
            data: response
        });
        //   console.log(html); 
        // 将拼接好的热门推荐数据显示在页面中
        $('#recommendBox').html(html);
    }
});