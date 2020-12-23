var express = require('express');
var app = express();
var http = require('http').Server(app);
var fs = require('fs');
var etu=require(path.join(__dirname,"etu"));
var admin=require(path.join(__dirname,"admin"));
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true}));

app.get("/", function (req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send("hello world");

});

//Fonction personnel
app.get("/log", function (req, res) {
    let date = new Date().toISOString();
    date = date.substring(0, 10) + ".log";
    res.sendFile("/home/1607nono/admin/logs/sites/2020/sites-" + date);
});

app.use("/etu",etu);//routeur vers les etudiants
app.use("/admin",admin);//routeur admin

app.use(function (req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !!!! ');

});


http.listen(3000, function () {
    console.log('Listening  ')
});