let express = require('express');
let connection = require('../db/connection');
let Auth = require('../lib/Auth');

let router = express.Router();

//获取所有病名列表
router.get('/allList', Auth, async function (req, res) {
  let pageSize = req.query.pageSize * 1,
      curPage = req.query.curPage * pageSize,
      maxPage = 0;
  let sql = `SELECT * FROM ((SELECT * FROM pc_db.pc_diname LIMIT ${curPage} , ${pageSize}) A LEFT JOIN pc_db.pc_dikind USING (dikind_id))`;
  await connection.query('SELECT COUNT(*) FROM pc_db.pc_diname', function (err, result) {
    if (err) res.send({ code: '999', msg: err});
    maxPage = Math.ceil(result[0]["COUNT(*)"] / pageSize);
  });
  await connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    res.send({ code: '000', maxPage: maxPage, data: result });
  });
});

//按病名查找
router.get('/allList/:diname_name', Auth, function (req, res) {
  let diname_name = req.params.diname_name;
  let sql = `SELECT * FROM ((SELECT * FROM pc_db.pc_diname WHERE diname_name='${diname_name}') A LEFT JOIN pc_db.pc_dikind USING (dikind_id))`;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    res.send({ code: '000', data: result });
  });
});

//增加病名
router.post('/addDiname', Auth, function (req, res) {
  let diname = req.body.data;
  let sql = `INSERT INTO pc_db.pc_diname (diname_name, diname_des, dikind_id) VALUES ('${diname.diname_name}','${diname.diname_des}','${diname.dikind_id}')`;
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
    sql = `UPDATE pc_db.pc_diname SET diname_des='${diname.diname_des}', dikind_id=${diname.dikind_id} WHERE diname_name='${diname.diname_name}'`;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    else {
      console.log("修改病名成功!diname_name:", diname.diname_name);
      res.send({ code: '000', data: result });
    }
  });
});

//删除病名
router.post('/delDiname', Auth, function (req, res) {
  let diname = req.body.data,
    sql = `DELETE FROM pc_db.pc_diname WHERE diname_name='${diname.diname_name}'`;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    else {
      console.log("删除病名成功!diname_name:", diname.diname_name);
      res.send({ code: '000', data: result });
    }
  });
});

module.exports = router;