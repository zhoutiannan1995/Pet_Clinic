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
  if (req.query.pageSize == undefined || req.query.curPage == undefined) {sql = `SELECT * FROM pc_db.pc_dikind`}
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
router.get('/find', Auth, function (req, res) {
  let dicase_name = req.query.dicase_name,
      dicase_id = req.query.dicase_id;
  let sql = dicase_id ? `SELECT * FROM ((SELECT * FROM pc_db.pc_dicase WHERE dicase_id='${dicase_id}') A LEFT JOIN pc_db.pc_diname USING (diname_id) LEFT JOIN pc_db.pc_dikind USING (dikind_id))` : `SELECT * FROM ((SELECT * FROM pc_db.pc_dicase WHERE dicase_name='${dicase_name}') A LEFT JOIN pc_db.pc_diname USING (diname_id) LEFT JOIN pc_db.pc_dikind USING (dikind_id))`;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    res.send({ code: '000', data: result });
  });
});

//增加病例
router.post('/addDicase', Auth, function (req, res) {
  let dicase = req.body.data;
  let sql = `INSERT INTO pc_db.pc_dicase (dicase_name, diagnosis_des, diagnosis_pic, diagnosis_video, treatment_des, diname_id) VALUES \
            ('${dicase.dicase_name}', '${dicase.diagnosis_des}', '${dicase.diagnosis_pic}', '${dicase.diagnosis_video}', '${dicase.treatment_des}', ${dicase.diname_id})`;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    else {
      console.log("增加病例成功!dicase_name:", dicase.dicase_name);
      res.send({ code: '000', data: result });
    }
  });
});

//修改病例
router.post('/modifyDicase', Auth, function (req, res) {
  let dicase = req.body.data,
    sql = `UPDATE pc_db.pc_dicase SET diagnosis_des='${dicase.diagnosis_des}',diagnosis_pic='${dicase.diagnosis_pic}',diagnosis_video='${dicase.diagnosis_video}',treatment_des='${dicase.treatment_des}',diname_id=${dicase.diname_id} WHERE dicase_name='${dicase.dicase_name}'`;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    else {
      console.log("修改病例成功!dicase_name:", dicase.dicase_name);
      res.send({ code: '000', data: result });
    }
  });
});

//删除病例
router.post('/delDicase', Auth, function (req, res) {
  let dicase = req.body.data,
    sql = `DELETE FROM pc_db.pc_dicase WHERE dicase_id='${dicase.dicase_id}'`;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    else {
      console.log("删除病例成功!dicase_id:", dicase.dicase_id);
      res.send({ code: '000', data: result });
    }
  });
});

module.exports = router;