var express = require('express');
var router = express.Router();
var controller_etu = require('../controller/etudiants');
var groupe = require(path.join(__dirname, "groupe"));
var registration = require('../controller/registration');
var login = require('../controller/login');
const {check, validationResult} = require('express-validator');
//TODO: enlever les require inutiles
var auth = require("../lib/auth");

router.use(function (req, res, next) {
    var prom = auth.getTokenCookie()
    prom.then((token) => {
        req.token = token; //On passe le token au prochain middleware si il est bien décrypté
        next()
    }).catch((msg) => { //Si on ne peut pas decripter le token ou si le cookie n'existe pas, on demande de se re-login
        console.log(msg)
        res.redirect('../login')
    })
});

// About page route.
router.use('/groupe', groupe);

router.get('/creneau', function (req, res) {
    controller_etu.get_creneau(req, res)
});


module.exports = router;