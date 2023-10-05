'use strict';

let mysql = require('mysql2');
const connection = mysql.createPool({
  user: 'root',
  password: 'root',
  database: 'raid_pos',
  host: 'localhost',
  port: 3306
});
 
module.exports = { connection };