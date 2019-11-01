// 引入第三模块mongoose
const mongoose = require('mongoose');
//创建评论集合规则
const commentSchema = new mongoose.Schema({
    // 文章id
    aid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
    },
    // 评论人用户id
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    time: {
        type: Date
    },
    content: {
        type: String
    }

});
// 创建评论集合
const Comment = mongoose.model('Comment', commentSchema);
// 将评论集合构造函数作为模块导出
module.exports={
    Comment,
}