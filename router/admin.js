var express = require('express');
var router = express.Router();
var controller_admin = require('../controller/admin');
var auth = require("../lib/auth");

router.use(function (req, res, next) {
    var cookie = req.cookies["session"];
    var prom = auth.getTokenCookie(cookie);
    prom.then((token) => {
        if (token.isAdmin) {//Si on est bien un admin
            req.token = token; //On passe le token au prochain middleware si il est bien décrypté
            next()
        } else {
            res.status(403).send("Accès interdit: vous n'êtes pas ADMIN");
        }//sinon
    }).catch((msg) => { //Si on ne peut pas decripter le token ou si le cookie n'existe pas, on demande de se re-login
        console.log(msg);
        res.redirect('../login')
    })
});
// Home page route.
router.get('/', function (req, res) {
    controller_admin.login(req, res);
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