let express = require('express');
let connection = require('../db/connection');
let Auth = require('../lib/Auth');

let router = express.Router();

//获取所有收费列表
router.get('/allList', Auth, async function (req, res) {
  let pageSize = req.query.pageSize * 1,
      curPage = req.query.curPage * pageSize,
      maxPage = 0;
  if (curPage < 0) {res.send({code: '999', msg: 'curPage不能小于零！'});return;}
  let sql = `SELECT * FROM pc_db.pc_pay LIMIT ${curPage} , ${pageSize}`;
  if (req.query.pageSize == undefined || req.query.curPage == undefined) {sql = `SELECT * FROM pc_db.pc_pay`}
  await connection.query('SELECT COUNT(*) FROM pc_db.pc_pay', function (err, result) {
    if (err) res.send({ code: '999', msg: err});
    maxPage = Math.ceil(result[0]["COUNT(*)"] / pageSize);
  });
  await connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    res.send({ code: '000', maxPage: maxPage || 1, data: result });
  });
});

//按收费名查找
router.get('/find', Auth, function (req, res) {
  let pay_name = req.query.pay_name,
      pay_id = req.query.pay_id;
  let sql = pay_id ? `SELECT * FROM pc_db.pc_pay WHERE pay_id='${pay_id}'` : `SELECT * FROM pc_db.pc_pay WHERE pay_name LIKE '%${pay_name}%'`;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    res.send({ code: '000', maxPage: 1, data: result });
  });
});

//增加收费
router.post('/addpay', Auth, function (req, res) {
  let pay = req.body.data;
  let sql = `INSERT INTO pc_db.pc_pay (pay_name, pay_amount) VALUES ('${pay.pay_name}','${pay.pay_amount}')`;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    else {
      console.log("增加收费成功!pay_name:", pay.pay_name);
      res.send({ code: '000', data: result });
    }
  });
});

//修改收费
router.post('/modifypay', Auth, function (req, res) {
  let pay = req.body.data,
    sql = `UPDATE pc_db.pc_pay SET pay_amount='${pay.pay_amount}' WHERE pay_id='${pay.pay_id}'`;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    else {
      console.log("修改收费成功!pay_id:", pay.pay_id);
      res.send({ code: '000', data: result });
    }
  });
});

//删除收费
router.post('/delpay', Auth, function (req, res) {
  let pay = req.body.data,
    sql = `DELETE FROM pc_db.pc_pay WHERE pay_id=${pay.pay_id}`;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    else {
      console.log("删除收费成功!pay_id:", pay.pay_id);
      res.send({ code: '000', data: result });
    }
  });
});

module.exports = router;