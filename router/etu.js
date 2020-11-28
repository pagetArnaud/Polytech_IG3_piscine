var express = require('express');
var router = express.Router();
var model_etudiant = require('../model/etudiant');
var model_creneau = require('../model/creneau');


// Home page route.
router.get('/', function (req, res) {
    res.send('etu home page');
});

// About page route.
router.get('/groupe', function (req, res) {
    res.send('etu page groupe');
});

router.get('/creneau', function (req, res) {
    res.sendfile(path.join(__dirname, "../vue/creneau/selection.html"));
});

router.get('/creneau/read', function (req, res) {
    var prom =model_creneau.getAllcreneau();
    prom.then((value) => {

        res.send(value);

    }).catch(
        function (){
            console.log("y'a une erreur dans la fonction ")
        }
    );

});

router.get('/groupe', function (req, res) {
    res.send('etu page groupe');
});

module.exports = router;