var express = require('express');
var app = express();
var http = require('http').Server(app);
var fs = require('fs');
var etu=require(path.join(__dirname,"etu"));
var admin=require(path.join(__dirname,"admin"));
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;

var controller_etu = require('../controller/etudiants');
var jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
var registration = require('../controller/registration');
var login = require('../controller/login');

app.set('view engine', 'ejs');//pour utliser le moteur de view EJS
app.set('views', path.join(__dirname, '/../vue'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", function (req, res) {

    res.render('connexion/index');

});


//Fonction personnel
app.get("/log", function (req, res) {
    let date = new Date().toISOString();
    date = date.substring(0, 10) + ".log";
    res.sendFile("/home/1607nono/admin/logs/sites/2020/sites-" + date);
});

//Partie login-------------------------------------------------
app.get('/login', function (req, res) {
    controller_etu.login(req, res);
});

app.get('/register', function (req, res) {
    controller_etu.register(req, res)

});
app.post('/register', registration.checkDataIsValidAndSanitize, registration.checkCorrectness, registration.correctForm);
//Login
app.post('/login', login.login);

//----------------------------------
app.use("/etu",etu);//routeur vers les etudiants
app.use("/admin",admin);//routeur admin

app.use(function (req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !!!! ');

});

http.listen(PORT, function () {
    console.log('Listening  ' + PORT)
});