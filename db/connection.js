let mysql = require('mysql');
let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'admin',
  password : '12345678',
  database : 'pc_db'
});
connection.connect();

module.exports = connection;