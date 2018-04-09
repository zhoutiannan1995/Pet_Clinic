let express = require('express');
let connection = require('../db/connection');
let Auth = require('../lib/Auth');

let router = express.Router();

//获取所有科室列表
router.get('/allList', Auth, async function (req, res) {
  let pageSize = req.query.pageSize * 1,
      curPage = req.query.curPage * pageSize,
      maxPage = 0;
  if (curPage < 0) res.send({code: '999', msg: 'curPage不能小于零！'});
  let sql = `SELECT * FROM pc_db.pc_department LIMIT ${curPage} , ${pageSize}`;
  if (req.query.pageSize == undefined || req.query.curPage == undefined) {sql = `SELECT * FROM pc_db.pc_department`}
  await connection.query('SELECT COUNT(*) FROM pc_db.pc_department', function (err, result) {
    if (err) res.send({ code: '999', msg: err});
    maxPage = Math.ceil(result[0]["COUNT(*)"] / pageSize);
  });
  await connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    res.send({ code: '000', maxPage: maxPage, data: result });
  });
});

//按科室名查找
router.get('/find', Auth, function (req, res) {
  let dpm_name = req.query.dpm_name,
      dpm_id = req.query.dpm_id;
  let sql = dpm_id ? `SELECT * FROM pc_db.pc_department WHERE dpm_id='${dpm_id}'` : `SELECT * FROM pc_db.pc_department WHERE dpm_name LIKE '%${dpm_name}%'`;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    res.send({ code: '000', maxPage: 1, data: result });
  });
});

//增加科室
router.post('/addDepartment', Auth, function (req, res) {
  let dpm = req.body.data;
  let sql = `INSERT INTO pc_db.pc_department (dpm_name, dpm_des) VALUES ('${dpm.dpm_name}','${dpm.dpm_des}')`;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    else {
      console.log("增加科室成功!dpm_name:", dpm.dpm_name);
      res.send({ code: '000', data: result });
    }
  });
});

//修改科室
router.post('/modifyDepartment', Auth, function (req, res) {
  let dpm = req.body.data,
    sql = `UPDATE pc_db.pc_department SET dpm_des='${dpm.dpm_des}' WHERE dpm_id='${dpm.dpm_id}'`;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    else {
      console.log("修改科室成功!dpm_id:", dpm.dpm_id);
      res.send({ code: '000', data: result });
    }
  });
});

//删除科室
router.post('/delDepartment', Auth, function (req, res) {
  let dpm = req.body.data,
    sql = `DELETE FROM pc_db.pc_department WHERE dpm_id=${dpm.dpm_id}`;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    else {
      console.log("删除科室成功!dpm_id:", dpm.dpm_id);
      res.send({ code: '000', data: result });
    }
  });
});

module.exports = router;