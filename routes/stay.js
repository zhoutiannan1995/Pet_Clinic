let express = require('express');
let moment = require('moment');
let connection = require('../db/connection');
let Auth = require('../lib/Auth');

let router = express.Router();

//获取所有住院信息列表
router.get('/allList', Auth, async function (req, res) {
  let pageSize = req.query.pageSize * 1,
      curPage = req.query.curPage * pageSize,
      maxPage = 0;
  if (curPage < 0) res.send({code: '999', msg: 'curPage不能小于零！'});
  let sql = `SELECT * FROM pcdb.pc_stay LIMIT ${curPage} , ${pageSize}`;
  if (req.query.pageSize == undefined || req.query.curPage == undefined) {sql = `SELECT * FROM pcdb.pc_stay`}
  await connection.query('SELECT COUNT(*) FROM pcdb.pc_stay', function (err, result) {
    if (err) res.send({ code: '999', msg: err});
    maxPage = Math.ceil(result[0]["COUNT(*)"] / pageSize);
  });
  await connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    res.send({ code: '000', maxPage: maxPage || 1, data: result });
  });
});

//按住院信息名查找
router.get('/find', Auth, function (req, res) {
  let stay_id = req.query.stay_id;
  let sql = `SELECT * FROM pcdb.pc_stay WHERE stay_id='${stay_id}'`;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    res.send({ code: '000', maxPage: 1, data: result });
  });
});

//增加住院信息
router.post('/addStay', Auth, function (req, res) {
  let stayData = req.body.data;
  let sql = `INSERT INTO pcdb.pc_stay (patient_name, stay_starttime, stay_endtime) VALUES ('${stayData.patient_name}','${moment(stayData.stay_starttime).format("YYYY-MM-DD")}','${moment(stayData.stay_endtime).format("YYYY-MM-DD")}')`;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    else {
      console.log("增加住院信息成功!");
      res.send({ code: '000', data: result });
    }
  });
});

//修改住院信息
router.post('/modifyStay', Auth, function (req, res) {
  let stayData = req.body.data,
    sql = `UPDATE pcdb.pc_stay SET patient_name='${stayData.patient_name}',stay_starttime='${moment(stayData.stay_starttime).format("YYYY-MM-DD")}',stay_endtime='${moment(stayData.stay_endtime).format("YYYY-MM-DD")}' WHERE stay_id='${stayData.stay_id}'`;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    else {
      console.log("修改住院信息成功!stay_id:", stayData.stay_id);
      res.send({ code: '000', data: result });
    }
  });
});

//删除住院信息
router.post('/delStay', Auth, function (req, res) {
  let stayData = req.body.data,
    sql = `DELETE FROM pcdb.pc_stay WHERE stay_id=${stayData.stay_id}`;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    else {
      console.log("删除住院信息成功!stay_id:", stayData.stay_id);
      res.send({ code: '000', data: result });
    }
  });
});

module.exports = router;