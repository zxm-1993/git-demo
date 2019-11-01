const {Article}=require('../../model/article');
module.exports= async(req,res)=>{
    // res.send('ok');
    //要删除的文章的id
    // res.send(req.query.id);
    await Article.findOneAndDelete({
        _id:req.query.id
    })
    // 重定向到文章列表
    res.redirect('/admin/article');

}