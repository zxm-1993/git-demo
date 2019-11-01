// 导入文章集合构造函数
const {
    Article
} = require('../../model/article');
// 导入评论集合构造函数
const {
    Comment
} = require('../../model/comment');
module.exports = async (req, res) => {
    // 接收客户端传来的id
    const id = req.query.id;
    //根据id查询文章详细信息
    const article = await Article.findOne({
        _id: id
    }).populate('author');
    // 根据文章id查找对应的评论
    const comments = await Comment.find({
        aid: id
    }).populate('uid');
    // res.send(comments);
    // return;
    res.render('home/article', {
        article,
        comments
    });
}