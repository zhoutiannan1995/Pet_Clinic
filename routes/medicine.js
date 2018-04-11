let express = require('express');
let connection = require('../db/connection');
let Auth = require('../lib/Auth');

let router = express.Router();

//获取所有药品列表
router.get('/allList', Auth, async function (req, res) {
  let pageSize = req.query.pageSize * 1,
      curPage = req.query.curPage * pageSize,
      maxPage = 0;
  if (curPage < 0) {res.send({code: '999', msg: 'curPage不能小于零！'});return;}
  let sql = `SELECT * FROM pc_db.pc_medicine LIMIT ${curPage} , ${pageSize}`;
  if (req.query.pageSize == undefined || req.query.curPage == undefined) {sql = `SELECT * FROM pc_db.pc_medicine`}
  await connection.query('SELECT COUNT(*) FROM pc_db.pc_medicine', function (err, result) {
    if (err) res.send({ code: '999', msg: err});
    maxPage = Math.ceil(result[0]["COUNT(*)"] / pageSize);
  });
  await connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    res.send({ code: '000', maxPage: maxPage || 1, data: result });
  });
});

//按药品名查找
router.get('/find', Auth, function (req, res) {
  let medicine_name = req.query.medicine_name,
      medicine_id = req.query.medicine_id;
  let sql = medicine_id ? `SELECT * FROM pc_db.pc_medicine WHERE medicine_id='${medicine_id}'` : `SELECT * FROM pc_db.pc_medicine WHERE medicine_name LIKE '%${medicine_name}%'`;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    res.send({ code: '000', maxPage: 1, data: result });
  });
});

//增加药品
router.post('/addMedicine', Auth, function (req, res) {
  let medicine = req.body.data;
  let sql = `INSERT INTO pc_db.pc_medicine (medicine_name, medicine_des) VALUES ('${medicine.medicine_name}','${medicine.medicine_des}')`;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    else {
      console.log("增加药品成功!medicine_name:", medicine.medicine_name);
      res.send({ code: '000', data: result });
    }
  });
});

//修改药品
router.post('/modifyMedicine', Auth, function (req, res) {
  let medicine = req.body.data,
    sql = `UPDATE pc_db.pc_medicine SET medicine_des='${medicine.medicine_des}' WHERE medicine_id='${medicine.medicine_id}'`;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    else {
      console.log("修改药品成功!medicine_id:", medicine.medicine_id);
      res.send({ code: '000', data: result });
    }
  });
});

//删除药品
router.post('/delMedicine', Auth, function (req, res) {
  let medicine = req.body.data,
    sql = `DELETE FROM pc_db.pc_medicine WHERE medicine_id=${medicine.medicine_id}`;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    else {
      console.log("删除药品成功!medicine_id:", medicine.medicine_id);
      res.send({ code: '000', data: result });
    }
  });
});

module.exports = router;