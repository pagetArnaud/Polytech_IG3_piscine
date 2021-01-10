var express = require('express');
var router = express.Router();
var controller_admin = require('../controller/admin');
var auth = require("../lib/auth");

router.use(function (req, res, next) {
    var cookie = req.cookies["session"];
    var token = auth.getTokenCookie(cookie);
    if (token) {
        console.log("On est dans admin et un token");
        if (token.isAdmin) {//Si on est bien un admin
            req.token = token; //On passe le token au prochain middleware si il est bien décrypté
            next()
        } else {//sinon
            res.status(403).send("Accès interdit: vous n'êtes pas ADMIN");
        }
    } else { //Si on ne peut pas decripter le token ou si le cookie n'existe pas, on demande de se re-login
        console.log("probleme de décodage du token");
        res.redirect('../login')
    }
});
// Home page route.
router.get('/', function (req, res) {
    res.send("bienvenu chez les admin")
});

// About page route.
router.get('/groupe', function (req, res) {
    res.send('admin page groupe');
});

router.get('/evenement', function (req, res) {
    buildFile(req, res, path.join(__dirname, "../vue/evenement/create.ejs"));

});


router.get('/creneau', function (req, res) {
    controller_admin.getAllCreneau(req, res);
});


router.get('/groupe', function (req, res) {
    res.send('admin page groupe');
});

module.exports = router;