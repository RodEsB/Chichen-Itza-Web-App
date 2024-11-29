const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost', // Cambia esto si tienes otro host
  user: 'root',      // Tu usuario de MySQL
  password: '1234',      // Tu contraseña de MySQL
  database: 'chichen_itza'
});

module.exports = pool.promise();
