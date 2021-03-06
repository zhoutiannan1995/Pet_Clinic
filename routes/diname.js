let express = require('express');
let connection = require('../db/connection');
let Auth = require('../lib/Auth');

let router = express.Router();

//获取所有病名列表
router.get('/allList', Auth, async function (req, res) {
  let pageSize = req.query.pageSize * 1,
      curPage = req.query.curPage * pageSize,
      maxPage = 0;
  if (curPage < 0) res.send({code: '999', msg: 'curPage不能小于零！'});
  let sql = `SELECT * FROM ((SELECT * FROM pcdb.pc_diname LIMIT ${curPage} , ${pageSize}) A LEFT JOIN pcdb.pc_dikind USING (dikind_id))`;
  if (req.query.pageSize == undefined || req.query.curPage == undefined) {sql = `SELECT * FROM (pcdb.pc_diname LEFT JOIN pcdb.pc_dikind USING (dikind_id))`}
  await connection.query('SELECT COUNT(*) FROM pcdb.pc_diname', function (err, result) {
    if (err) res.send({ code: '999', msg: err});
    maxPage = Math.ceil(result[0]["COUNT(*)"] / pageSize);
  });
  await connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    res.send({ code: '000', maxPage: maxPage || 1, data: result });
  });
});

//按病名查找
router.get('/find', Auth, function (req, res) {
  let diname_name = req.query.diname_name,
      diname_id = req.query.diname_id,
      dikind_id = req.query.dikind_id;
  let sql = null;
  if (diname_id) sql = `SELECT * FROM ((SELECT * FROM pcdb.pc_diname WHERE diname_id='${diname_id}') A LEFT JOIN pcdb.pc_dikind USING (dikind_id))`;
  else if (diname_name) sql = `SELECT * FROM ((SELECT * FROM pcdb.pc_diname WHERE diname_name='${diname_name}') A LEFT JOIN pcdb.pc_dikind USING (dikind_id))`;
  else if (dikind_id) sql = `SELECT * FROM pcdb.pc_diname WHERE dikind_id=${dikind_id}`
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    res.send({ code: '000', maxPage: 1, data: result });
  });
});

//增加病名
router.post('/addDiname', Auth, function (req, res) {
  let diname = req.body.data;
  let sql = `INSERT INTO pcdb.pc_diname (diname_name, diname_des, dikind_id) VALUES ('${diname.diname_name}','${diname.diname_des}','${diname.dikind_id}')`;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    else {
      console.log("增加病名成功!diname_name:", diname.diname_name);
      res.send({ code: '000', data: result });
    }
  });
});

//修改病名
router.post('/modifyDiname', Auth, function (req, res) {
  let diname = req.body.data,
    sql = `UPDATE pcdb.pc_diname SET diname_des='${diname.diname_des}' WHERE diname_id='${diname.diname_id}'`;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    else {
      console.log("修改病名成功!diname_id:", diname.diname_id);
      res.send({ code: '000', data: result });
    }
  });
});

//删除病名
router.post('/delDiname', Auth, function (req, res) {
  let diname = req.body.data,
    sql = `DELETE FROM pcdb.pc_diname WHERE diname_id='${diname.diname_id}'`;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    else {
      console.log("删除病名成功!diname_id:", diname.diname_id);
      res.send({ code: '000', data: result });
    }
  });
});

module.exports = router;