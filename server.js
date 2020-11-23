var express = require('express');
var app = express();
var http = require('http').Server(app);
var fs = require('fs');
var etu=require('./router/etu');


app.get("/", function (req, res) {
    res.setHeader('Content-Type', 'text/plain');

    res.send('hello world');


});

app.use("/etu",etu);//routeur vers les etudiants

app.use(function (req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !!!! ');

});

http.listen(process.env.PORT, function () {
    console.log('Listening  ')
});