let mysql = require('mysql');
let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '12345',
  database : 'pcdb'
});
connection.connect();

module.exports = connection;