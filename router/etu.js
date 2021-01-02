const express = require('express');
const router = express.Router();
const controller_etu = require('../controller/etudiants');
const path = require("path");
const groupe = require(path.join(__dirname, "groupe"));
const auth = require("../lib/auth");


router.use(function (req, res, next) {
    var cookie = req.cookies["session"];
    var prom = auth.getTokenCookie(cookie)
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