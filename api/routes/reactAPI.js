var express = require('express');
var mysql = require('mysql');
var router = express.Router();


// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'testDB'
// });
  
// connection.connect();
  
// connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
// if (err) throw err;

// console.log('The solution is: ', rows[0].solution);
// })

// connection.end();

router.get('/', (req, res, next) => {
    res.send('API is working correctly');
});

module.exports = router;