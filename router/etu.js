var express = require('express');
var router = express.Router();
var controller_etu = require('../controller/etudiants');

var groupe = require(path.join(__dirname, "groupe"));
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var registration = require('../controller/registration');
router.use(urlencodedParser)
router.use(express.json())
const {check, validationResult} = require('express-validator');


// Home page route.
router.get('/', function (req, res) {
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

router.post('/register', registration.checkDataIsValidAndSanitize, registration.checkCorrectness, registration.correctForm);

module.exports = router;