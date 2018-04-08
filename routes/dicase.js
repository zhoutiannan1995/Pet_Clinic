let express = require('express');
let connection = require('../db/connection');
let Auth = require('../lib/Auth');

let router = express.Router();

//获取所有病例列表
router.get('/allList', Auth, async function (req, res) {
  let pageSize = req.query.pageSize * 1,
      curPage = req.query.curPage * pageSize,
      maxPage = 0;
  if (curPage < 0) res.send({code: '999', msg: 'curPage不能小于零！'});
  let sql = `SELECT * FROM ((SELECT * FROM pc_db.pc_dicase LIMIT ${curPage} , ${pageSize}) A LEFT JOIN pc_db.pc_diname USING (diname_id) LEFT JOIN pc_db.pc_dikind USING (dikind_id))`;
  await connection.query('SELECT COUNT(*) FROM pc_db.pc_dicase', function (err, result) {
    if (err) res.send({ code: '999', msg: err});
    maxPage = Math.ceil(result[0]["COUNT(*)"] / pageSize);
  });
  await connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    res.send({ code: '000', maxPage: maxPage, data: result });
  });
});

//按病例查找
router.get('/allList/:dicase_name', Auth, function (req, res) {
  let dicase_name = req.params.dicase_name;
  let sql = `SELECT * FROM ((SELECT * FROM pc_db.pc_dicase WHERE dicase_name='${dicase_name}') A LEFT JOIN pc_db.pc_diname USING (diname_id) LEFT JOIN pc_db.pc_dikind USING (dikind_id))`;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    res.send({ code: '000', data: result });
  });
});

//增加病例
router.post('/addDiname', Auth, function (req, res) {
  let diname = req.body.data;
  let sql = `INSERT INTO pc_db.pc_diname (case_name, diname_des, dikind_id) VALUES ('${diname.case_name}','${diname.diname_des}','${diname.dikind_id}')`;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    else {
      console.log("增加病名成功!case_name:", diname.case_name);
      res.send({ code: '000', data: result });
    }
  });
});

//修改病例
router.post('/modifyDiname', Auth, function (req, res) {
  let diname = req.body.data,
    sql = `UPDATE pc_db.pc_diname SET diname_des='${diname.diname_des}', dikind_id=${diname.dikind_id} WHERE case_name='${diname.case_name}'`;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    else {
      console.log("修改病名成功!case_name:", diname.case_name);
      res.send({ code: '000', data: result });
    }
  });
});

//删除病例
router.post('/delDiname', Auth, function (req, res) {
  let diname = req.body.data,
    sql = `DELETE FROM pc_db.pc_diname WHERE case_name='${diname.case_name}'`;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    else {
      console.log("删除病名成功!case_name:", diname.case_name);
      res.send({ code: '000', data: result });
    }
  });
});

module.exports = router;