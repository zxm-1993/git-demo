const {
	Article
} = require('../../model/article');
module.exports = async (req, res) => {
	// 标识 标识当前访问的是文章管理页面
	req.app.locals.currentLink = 'article';
	let id = req.query.id;
	// res.send(id);
	let articles = await Article.findOne({
		_id: id
	})
	// res.send(articles);
	if (id) {
		res.render('admin/article-edit.art', {
			articles: articles,
			link: '/admin/article-modify?id='+id,
		});
	}
	res.render('admin/article-edit', {
		link:'/admin/article-add',
	});
}