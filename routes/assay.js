let express = require('express');
let connection = require('../db/connection');
let Auth = require('../lib/Auth');

let router = express.Router();

//获取所有化验列表
router.get('/allList', Auth, async function (req, res) {
  let pageSize = req.query.pageSize * 1,
      curPage = req.query.curPage * pageSize,
      maxPage = 0;
  if (curPage < 0) {res.send({code: '999', msg: 'curPage不能小于零！'});return;}
  let sql = `SELECT * FROM pcdb.pc_assay LIMIT ${curPage} , ${pageSize}`;
  if (req.query.pageSize == undefined || req.query.curPage == undefined) {sql = `SELECT * FROM pcdb.pc_assay`}
  await connection.query('SELECT COUNT(*) FROM pcdb.pc_assay', function (err, result) {
    if (err) res.send({ code: '999', msg: err});
    maxPage = Math.ceil(result[0]["COUNT(*)"] / pageSize);
  });
  await connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    res.send({ code: '000', maxPage: maxPage || 1, data: result });
  });
});

//按化验名查找
router.get('/find', Auth, function (req, res) {
  let assay_name = req.query.assay_name,
      assay_id = req.query.assay_id;
  let sql = assay_id ? `SELECT * FROM pcdb.pc_assay WHERE assay_id='${assay_id}'` : `SELECT * FROM pcdb.pc_assay WHERE assay_name LIKE '%${assay_name}%'`;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    res.send({ code: '000', maxPage: 1, data: result });
  });
});

//增加化验
router.post('/addAssay', Auth, function (req, res) {
  let assay = req.body.data;
  let sql = `INSERT INTO pcdb.pc_assay (assay_name, assay_des) VALUES ('${assay.assay_name}','${assay.assay_des}')`;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    else {
      console.log("增加化验成功!assay_name:", assay.assay_name);
      res.send({ code: '000', data: result });
    }
  });
});

//修改化验
router.post('/modifyAssay', Auth, function (req, res) {
  let assay = req.body.data,
    sql = `UPDATE pcdb.pc_assay SET assay_des='${assay.assay_des}' WHERE assay_id='${assay.assay_id}'`;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    else {
      console.log("修改化验成功!assay_id:", assay.assay_id);
      res.send({ code: '000', data: result });
    }
  });
});

//删除化验
router.post('/delAssay', Auth, function (req, res) {
  let assay = req.body.data,
    sql = `DELETE FROM pcdb.pc_assay WHERE assay_id=${assay.assay_id}`;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    else {
      console.log("删除化验成功!assay_id:", assay.assay_id);
      res.send({ code: '000', data: result });
    }
  });
});

module.exports = router;