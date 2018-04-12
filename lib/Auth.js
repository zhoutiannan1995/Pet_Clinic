module.exports = (req, res, next) => {
    let pcsid = req.session.pcsid;
    next();
    // if (!pcsid) {
    //     console.log("没有pcsid，为未登录状态！");
    //     res.send({code: '999', msg: '请先登录'});
    // }
    // else {
    //     next();
    // }
}