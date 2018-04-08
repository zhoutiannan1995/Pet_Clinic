let express = require('express');
let connection = require('../db/connection');
let Auth = require('../lib/Auth');

let router = express.Router();

//获取所有病种列表
router.get('/allList', Auth, async function (req, res) {
  let pageSize = req.query.pageSize * 1,
      curPage = req.query.curPage * pageSize,
      maxPage = 0;
  let sql = `SELECT * FROM pc_db.pc_dikind LIMIT ${curPage} , ${pageSize}`;
  await connection.query('SELECT COUNT(*) FROM pc_db.pc_dikind', function (err, result) {
    if (err) res.send({ code: '999', msg: err});
    maxPage = Math.ceil(result[0]["COUNT(*)"] / pageSize);
  });
  await connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    res.send({ code: '000', maxPage: maxPage, data: result });
  });
});

//按病种名查找
router.get('/allList/:dikind_name', Auth, function (req, res) {
  let dikind_name = req.params.dikind_name;
  let sql = `SELECT * FROM pc_db.pc_dikind WHERE dikind_name='${dikind_name}'`;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    res.send({ code: '000', data: result });
  });
});

//增加病种
router.post('/addDikind', Auth, function (req, res) {
  let dikind = req.body.data;
  let sql = `INSERT INTO pc_db.pc_dikind (dikind_name, dikind_des) VALUES ('${dikind.dikind_name}','${dikind.dikind_des}')`;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    else {
      console.log("增加病种成功!dikind_name:", dikind.dikind_name);
      res.send({ code: '000', data: result });
    }
  });
});

//修改病种
router.post('/modifyDikind', Auth, function (req, res) {
  let dikind = req.body.data,
    sql = `UPDATE pc_db.pc_dikind SET dikind_des='${dikind.dikind_des}' WHERE dikind_name='${dikind.dikind_name}'`;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    else {
      console.log("修改病种成功!dikind_name:", dikind.dikind_name);
      res.send({ code: '000', data: result });
    }
  });
});

//删除病种
router.post('/delDikind', Auth, function (req, res) {
  let dikind = req.body.data,
    sql = `DELETE FROM pc_db.pc_dikind WHERE dikind_name='${dikind.dikind_name}'`;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    else {
      console.log("删除病种成功!dikind_name:", dikind.dikind_name);
      res.send({ code: '000', data: result });
    }
  });
});

module.exports = router;