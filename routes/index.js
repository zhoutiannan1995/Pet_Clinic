let express = require('express');
let router = express.Router();
let connection = require('../db/connection');

/* GET home page. */
router.get('/', function(req, res) {
  connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    if (err) throw err;
    console.log('The solution is: ', rows[0].solution);
  });
  res.render('index', { title: 'Express' });
});

module.exports = router;
