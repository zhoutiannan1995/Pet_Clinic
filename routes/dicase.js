let express = require('express');
let multer  = require('multer');
let fs = require('fs');
let connection = require('../db/connection');
let Auth = require('../lib/Auth');

var upload = multer({ dest: 'upload/' });
let router = express.Router();

//获取所有病例列表
router.get('/allList', Auth, async function (req, res) {
  let pageSize = req.query.pageSize * 1,
      curPage = req.query.curPage * pageSize,
      maxPage = 0;
  if (curPage < 0) res.send({code: '999', msg: 'curPage不能小于零！'});
  let sql = `SELECT * FROM ((SELECT * FROM pcdb.pc_dicase LIMIT ${curPage} , ${pageSize}) A LEFT JOIN pcdb.pc_diname USING (diname_id) LEFT JOIN pcdb.pc_dikind USING (dikind_id))`;
  if (req.query.pageSize == undefined || req.query.curPage == undefined) {sql = `SELECT * FROM ((SELECT * FROM pcdb.pc_dicase) A LEFT JOIN pcdb.pc_diname USING (diname_id) LEFT JOIN pcdb.pc_dikind USING (dikind_id))`}
  await connection.query('SELECT COUNT(*) FROM pcdb.pc_dicase', function (err, result) {
    if (err) res.send({ code: '999', msg: err});
    maxPage = Math.ceil(result[0]["COUNT(*)"] / pageSize);
  });
  await connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    res.send({ code: '000', maxPage: maxPage || 1, data: result });
  });
});

//按病例查找
router.get('/find', Auth, function (req, res) {
  let dicase_name = req.query.dicase_name,
      dicase_id = req.query.dicase_id;
  let sql = dicase_id ? `SELECT * FROM ((SELECT * FROM pcdb.pc_dicase WHERE dicase_id='${dicase_id}') A LEFT JOIN pcdb.pc_diname USING (diname_id) LEFT JOIN pcdb.pc_dikind USING (dikind_id))` : `SELECT * FROM ((SELECT * FROM pcdb.pc_dicase WHERE dicase_name='${dicase_name}') A LEFT JOIN pcdb.pc_diname USING (diname_id) LEFT JOIN pcdb.pc_dikind USING (dikind_id))`;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    res.send({ code: '000', maxPage: 1, data: result });
  });
});

//增加病例
router.post('/addDicase', Auth, upload.fields([{name:'file'},{name:'video'}]), function (req, res) {
//upload.fields([{name:'file'},{name:'text'}]), function (req, res) {
  console.log("filerewrwrewrewrewre",req.files.file[0]);
  console.log("filerewrwrewrewrewre",req.files.video[0]);
  console.log("body888888e4239493294929924",req.body);
  let dicase = req.body;
  let arr = req.files.file[0].originalname.split('.');
  let newPicName = dicase.dicase_name + '.' + arr[arr.length-1];
      arr = req.files.video[0].originalname.split('.');
  let newVidName = dicase.dicase_name + '.' + arr[arr.length-1];
  console.log(newPicName);
  let sql = `INSERT INTO pcdb.pc_dicase (dicase_name, diagnosis_des, diagnosis_pic, diagnosis_video, treatment_des, diname_id) VALUES \
            ('${dicase.dicase_name}', '${dicase.diagnosis_des}', '${newPicName}', '${newVidName}', '${dicase.treatment_des}', ${dicase.diname_id})`;

  let tmp_path = req.files.file[0].path;
  let tmp_path2 = req.files.video[0].path;
  let target_path = 'public/images/' + newPicName;
  let target_path2 = 'public/videos/' + newVidName;
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    else {
      let src = fs.createReadStream(tmp_path);
      let dest = fs.createWriteStream(target_path);
      src.pipe(dest);
      src.on('end', function() {
        let src = fs.createReadStream(tmp_path2);
        let dest = fs.createWriteStream(target_path2);
        src.pipe(dest);
        src.on('end', function() {
          console.log("增加病例成功!dicase_name:", dicase.dicase_name);
          res.send({ code: '000', data: result }); 
        });
        src.on('error', function(err) {
          res.send({ code: '999', msg: '视频保存失败！'}); 
        });
      });
      src.on('error', function(err) {
        res.send({ code: '999', msg: '图像保存失败！'}); 
      });
    }
  });
  res.send({code:'000', msg:'成功'});
});

//修改病例
// router.post('/modifyDicase', Auth, function (req, res) {
//   let dicase = req.body.data,
//     sql = `UPDATE pcdb.pc_dicase SET diagnosis_des='${dicase.diagnosis_des}',diagnosis_pic='${dicase.diagnosis_pic}',diagnosis_video='${dicase.diagnosis_video}',treatment_des='${dicase.treatment_des}',diname_id=${dicase.diname_id} WHERE dicase_id='${dicase.dicase_id}'`;
//   connection.query(sql, function (err, result) {
//     if (err) res.send({ code: '999', msg: err });
//     else {
//       console.log("修改病例成功!dicase_id:", dicase.dicase_id);
//       res.send({ code: '000', data: result });
//     }
//   });
// });
//修改病例
router.post('/modifyDicase', Auth, upload.fields([{name:'file'},{name:'video'}]), async function (req, res) {
  //upload.fields([{name:'file'},{name:'text'}]), function (req, res) {
    console.log("filerewrwrewrewrewre",req.files.file[0]);
    console.log("filerewrwrewrewrewre",req.files.video[0]);
    console.log("body888888e4239493294929924",req.body);
    let dicase = req.body;
    //删除已有图像视频文件
    await del(dicase.dicase_name);
    let arr = req.files.file[0].originalname.split('.');
    let newPicName = dicase.dicase_name + '.' + arr[arr.length-1];
        arr = req.files.video[0].originalname.split('.');
    let newVidName = dicase.dicase_name + '.' + arr[arr.length-1];
    console.log(newPicName);
    let sql = `UPDATE pcdb.pc_dicase SET diagnosis_des='${dicase.diagnosis_des}',diagnosis_pic='${newPicName}',diagnosis_video='${newVidName}',treatment_des='${dicase.treatment_des}',diname_id=${dicase.diname_id} WHERE dicase_id='${dicase.dicase_id}'`;
  
    let tmp_path = req.files.file[0].path;
    let tmp_path2 = req.files.video[0].path;
    let target_path = 'public/images/' + newPicName;
    let target_path2 = 'public/videos/' + newVidName;
    await connection.query(sql, function (err, result) {
      if (err) res.send({ code: '999', msg: err });
      else {
        let src = fs.createReadStream(tmp_path);
        let dest = fs.createWriteStream(target_path);
        src.pipe(dest);
        src.on('end', function() {
          let src = fs.createReadStream(tmp_path2);
          let dest = fs.createWriteStream(target_path2);
          src.pipe(dest);
          src.on('end', function() {
            console.log("修改病例成功!dicase_name:", dicase.dicase_name);
            res.send({ code: '000', data: result }); 
          });
          src.on('error', function(err) {
            res.send({ code: '999', msg: '视频保存失败！'}); 
          });
        });
        src.on('error', function(err) {
          res.send({ code: '999', msg: '图像保存失败！'}); 
        });
      }
    });
    res.send({code:'000', msg:'成功'});
  });

//删除病例
router.post('/delDicase', Auth, function (req, res) {
  let dicase = req.body.data,
    sql = `DELETE FROM pcdb.pc_dicase WHERE dicase_id='${dicase.dicase_id}'`;
  del(dicase.dicase_name);
  connection.query(sql, function (err, result) {
    if (err) res.send({ code: '999', msg: err });
    else {
      console.log("删除病例成功!dicase_id:", dicase.dicase_id);
      res.send({ code: '000', data: result });
    }
  });
});

function del(name){
  fs.readdir('/var/www/Pet_Clinic/public/images', function (error, files){
    if (error) throw error;
    var cc = files.filter(function (fileName){
      let reg = new RegExp(name+'.');
      return reg.test(fileName);
    })[0];
    fs.unlinkSync('/var/www/Pet_Clinic/public/images/'+cc);
  });
  fs.readdir('/var/www/Pet_Clinic/public／videos', function (error, files){
    if (error) throw error;
    var cc = files.filter(function (fileName){
      let reg = new RegExp(name+'.');
      return reg.test(fileName);
    })[0];
    fs.unlinkSync('/var/www/Pet_Clinic/public/videos/'+cc);
  });
}


module.exports = router;