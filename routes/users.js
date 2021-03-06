let express = require('express');
let moment = require('moment');
let connection = require('../db/connection');
let Auth = require('../lib/Auth');

let router = express.Router();

//获取所有用户列表
router.get('/allList', Auth, async function (req, res) {
  let pageSize = req.query.pageSize * 1,
      curPage = req.query.curPage * pageSize,
      maxPage = 0;
  if (curPage < 0) res.send({code: '999', msg: 'curPage不能小于零！'});
  let sql = `SELECT * FROM pcdb.pc_user LIMIT ${curPage} , ${pageSize}`;
  if (req.query.pageSize == undefined || req.query.curPage == undefined) {sql = `SELECT * FROM pcdb.pc_user`}
  await connection.query('SELECT COUNT(*) FROM pcdb.pc_user', function (err, result) {
    if (err) res.send({ code: '999', msg: err});
    maxPage = Math.ceil(result[0]["COUNT(*)"] / pageSize);
  });
  await connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    res.send({ code: '000', maxPage: maxPage || 1, data: result });
  });
});

//按用户名查找
router.get('/find', Auth, function (req, res) {
  let username = req.query.username,
      user_id = req.query.user_id;
  let sql = username ? `SELECT * FROM pcdb.pc_user WHERE username='${username}'` : `SELECT * FROM pcdb.pc_user WHERE user_id='${user_id}'`;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    res.send({ code: '000', maxPage: 1, data: result });
  });
});

//增加用户
router.post('/addUser', Auth, function (req, res) {
  let user = req.body.data,
    now = moment().format("YYYY-MM-DD HH:mm:ss"),
    sql = `INSERT INTO pcdb.pc_user (username, password, create_time, authority) VALUES ('${user.username}','${user.password}','${now}',${user.authority})`;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    else {
      console.log("增加用户成功!username:", user.username);
      res.send({ code: '000', data: result });
    }
  });
});

//修改用户
router.post('/modifyUser', Auth, function (req, res) {
  let user = req.body.data,
    sql = `UPDATE pcdb.pc_user SET password='${user.password}', authority=${user.authority} WHERE user_id='${user.user_id}'`;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    else {
      console.log("修改用户成功!user_id:", user.user_id);
      res.send({ code: '000', data: result });
    }
  });
});

//删除用户
router.post('/delUser', Auth, function (req, res) {
  let user = req.body.data,
    sql = `DELETE FROM pcdb.pc_user WHERE user_id='${user.user_id}'`;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    else {
      console.log("删除用户成功!user_id:", user.user_id);
      res.send({ code: '000', data: result });
    }
  });
});

module.exports = router;