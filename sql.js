
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "mysql-1607nono.alwaysdata.net",
    user: "1607nono",
    password: "Reglisse1"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});