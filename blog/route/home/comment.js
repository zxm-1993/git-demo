// 将评论集合构造函数进行导入
const {
    Comment
} = require('../../model/comment');
module.exports = async (req, res) => {
    const {
        content,
        uid,
        aid
    } = req.body;
    // res.send(req.body);
    await Comment.create({
        content: content,
        uid: uid,
        aid: aid,
        time: new Date(),
    });
    //重定向回当前文章
    res.redirect('/home/article?id=' + aid);
    // res.send('ok');
}