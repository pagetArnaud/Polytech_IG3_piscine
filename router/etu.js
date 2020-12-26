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
    var cookie = req.cookies["session"];
    if (cookie) {//Si le cookies existe
        token = auth.decrypte(cookie);
        if (token !== false) {//Si c'est bien le token de session et qu'on peut le decrypter
            req.token = token;//On passe le token au prochain middleware
            next()
        } else {//Si on ne peut pas le decripter, on demande de se re-login
            res.redirect("../login")
        }
    } else {//Si le cookie n'existe pas, on se login
        res.redirect("../login")
    }
});


// About page route.
router.use('/groupe', groupe);

router.get('/creneau', function (req, res) {
    controller_etu.get_creneau(req, res)

});
router.get('/creneau/join', function (req, res) {
    controller_etu.resa_Creneau(req, res)

});

router.post("/creneau/join", function (req, res) {
    controller_etu.create_resa_Creneau(req, res)

});



module.exports = router;