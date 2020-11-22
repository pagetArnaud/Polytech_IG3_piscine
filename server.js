var express = require('express');
var app = express();
var http = require('http').Server(app);
var fs = require('fs');

app.get("/", function (req, res) {
    res.setHeader('Content-Type', 'text/plain');

    res.send('hello world');


});


app.get("/sql", function (req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send("faut liée le fichier")


});
app.use(function (req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !!!!: ');

});

http.listen(process.env.PORT, function () {
    console.log('Listening  ')
});