const express = require('express');
const app = express();
const http = require('http').Server(app);
const etu = require(path.join(__dirname, "etu"));
const admin = require(path.join(__dirname, "admin"));
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;
const controller_etu = require('../controller/etudiants');
const bodyParser = require('body-parser');
const registration = require('../controller/registration');
const login = require('../controller/login');


//TODO faire en sorte qu'on ne puisse pas accéder aux pages de login une fois connecté -> rediriger vers le menu admin ou etu


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
    res.sendFile("/home/1607nono/admin/logs/sites/2021/sites-" + date);
});
//TODO appeler middleware proprement
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