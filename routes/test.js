let express = require('express');
let connection = require('../db/connection');
let Auth = require('../lib/Auth');

let router = express.Router();

//获取所有试题列表
router.get('/allList', Auth, async function (req, res) {
  let pageSize = req.query.pageSize * 1,
      curPage = req.query.curPage * pageSize,
      maxPage = 0;
  if (curPage < 0) {res.send({code: '999', msg: 'curPage不能小于零！'});return;}
  let sql = `SELECT * FROM pcdb.pc_test LIMIT ${curPage} , ${pageSize}`;
  if (req.query.pageSize == undefined || req.query.curPage == undefined) {sql = `SELECT * FROM pcdb.pc_test`}
  await connection.query('SELECT COUNT(*) FROM pcdb.pc_test', function (err, result) {
    if (err) res.send({ code: '999', msg: err});
    maxPage = Math.ceil(result[0]["COUNT(*)"] / pageSize);
  });
  await connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    res.send({ code: '000', maxPage: maxPage || 1, data: result });
  });
});

//按试题名查找
router.get('/find', Auth, function (req, res) {
  let test_question = req.query.test_question,
      test_id = req.query.test_id;
  let sql = test_id ? `SELECT * FROM pcdb.pc_test WHERE test_id='${test_id}'` : `SELECT * FROM pcdb.pc_test WHERE test_question LIKE '%${test_question}%'`;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    res.send({ code: '000', maxPage: 1, data: result });
  });
});

//增加试题
router.post('/addTest', Auth, function (req, res) {
  let test = req.body.data;
  let sql = `INSERT INTO pcdb.pc_test (test_question, choice_A, choice_B, choice_C, choice_D, choice_correct) VALUES ('${test.test_question}','${test.choice_A}', '${test.choice_B}', '${test.choice_C}', '${test.choice_D}', '${test.choice_correct}')`;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    else {
      console.log("增加试题成功!test_question:", test.test_question);
      res.send({ code: '000', data: result });
    }
  });
});

//修改试题
router.post('/modifyTest', Auth, function (req, res) {
  let test = req.body.data,
    sql = `UPDATE pcdb.pc_test SET choice_A='${test.choice_A}', choice_B='${test.choice_B}', choice_C='${test.choice_C}', choice_D='${test.choice_D}', choice_correct='${test.choice_correct}' WHERE test_id='${test.test_id}'`;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    else {
      console.log("修改试题成功!test_id:", test.test_id);
      res.send({ code: '000', data: result });
    }
  });
});

//删除试题
router.post('/delTest', Auth, function (req, res) {
  let test = req.body.data,
    sql = `DELETE FROM pcdb.pc_test WHERE test_id=${test.test_id}`;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    else {
      console.log("删除试题成功!test_id:", test.test_id);
      res.send({ code: '000', data: result });
    }
  });
});

module.exports = router;