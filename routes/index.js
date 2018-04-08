let express = require('express');
let connection = require('../db/connection');
let Auth = require('../lib/Auth');

let router = express.Router();

//首页
router.get('/', function (req, res) {
  res.send({ code: '000', msg: 'Welcome to the Pet Clinic System!' })
  //res.render('index', { title: 'Express' });
});

//登录
router.post('/login', function (req, res) {
  let login = req.body.data;
  let sql = `SELECT * FROM pc_db.pc_user WHERE username = '${login.username}' AND password = '${login.password}'`;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    if (result.length == 0) { res.send({ code: '999', msg: '用户名或密码错误' }); }
    let pcsid = req.session.pcsid;
    if (!pcsid) {
      pcsid = req.session.pcsid = {
        username: login.username,
        validita: true
      }
    }
    res.send({ code: '000', msg: '登录成功' });
  })
});

//登出
router.get('/logout', Auth, function (req, res) {
  req.session.destroy();
  res.send({ code: '000', msg: '注销成功' });
});

module.exports = router;