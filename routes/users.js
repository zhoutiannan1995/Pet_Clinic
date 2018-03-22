let express = require('express');
let moment = require('moment');
let connection = require('../db/connection');
let Auth = require('../lib/Auth');

let router = express.Router();

//获取所有用户列表
router.get('/allList', Auth, function (req, res) {
  try {
    let sql = 'SELECT * FROM pc_db.pc_user';
    connection.query(sql, function (err, rows, fields) {
      if (err) throw err;
      rows.forEach(e => {
        console.log(e);
      });
      res.send(rows);
    });
  } catch (err) { console.log(err); }
  //res.send('respond with a resource');
});

//按用户名查找
router.get('/allList/:username', Auth, function (req, res) {
  try {
    let username = req.params.username;
    let sql = `SELECT * FROM pc_db.pc_user WHERE username='${username}'`;
    connection.query(sql, function (err, rows, fields) {
      if (err) throw err;
      rows.forEach(e => {
        console.log(e);
      });
      res.send(rows);
    });
  } catch (err) { console.log(err); }
});

//增加用户
router.post('/addUser', Auth, function (req, res) {
  try {
    let user = req.body.data,
        now = moment().format("YYYY-MM-DD HH:mm:ss"),
        sql = `INSERT INTO pc_db.pc_user (username, password, create_time, last_access_time, authority) VALUES ('${user.username}','${user.password}','${now}','${now}',${user.authority})`;
    connection.query(sql, function (err, rows, fields) {
      if (err) throw err;
      console.log("successssssssssssss!");
      res.send(rows);
    });
  } catch (err) { console.log(err); }
});

module.exports = router;
