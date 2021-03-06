const express = require('express');
const router = express.Router();
const controller_etu = require('../controller/etudiants');
const path = require("path");
const groupe = require(path.join(__dirname, "groupe"));
var auth = require("../lib/auth");


router.use(function (req, res, next) {
    var cookie = req.cookies["session"];

    var token = auth.getTokenCookie(cookie);

    if (token) {
        req.token = token; //On passe le token au prochain middleware si il est bien décrypté
        next()
    } else { //Si on ne peut pas decripter le token ou si le cookie n'existe pas, on demande de se re-login
        console.log("on ne peut pas decrypter le token etu");
        res.redirect('../login')
    }
});
router.get("/", function (req, res) {
    console.log(req.query.success)
    if (req.query.success == 1) {
        console.log("oui ooui")
        res.render('menu/index', {Registration : true})
    }else {
        res.render("menu/index");
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