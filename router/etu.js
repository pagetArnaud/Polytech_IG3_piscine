var express = require('express');
var router = express.Router();
var controller_etu = require('../controller/etudiants');

var groupe = require(path.join(__dirname, "groupe"));
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var registration = require('../controller/registration');
var login = require('../controller/login');
router.use(urlencodedParser)
router.use(express.json())
const {check, validationResult} = require('express-validator');
//TODO: enlever les require inutiles


// Home page route.
router.get('/login', function (req, res) {
    controller_etu.login(req, res);
});

router.get('/register', function (req, res) {
    controller_etu.register(req, res)

});

// About page route.
router.use('/groupe', groupe);


router.get('/creneau', function (req, res) {
    controller_etu.get_creneau(req, res)

});
//registration
router.post('/register', registration.checkDataIsValidAndSanitize, registration.checkCorrectness, registration.correctForm);

//Login
router.post('/login',login.login)
module.exports = router;