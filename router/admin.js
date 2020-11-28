var express = require('express');
var router = express.Router();
var model_etudiant = require('../model/etudiant');
var model_creneau = require('../model/creneau');


// Home page route.
router.get('/', function (req, res) {
    res.send('admin home page');
});

// About page route.
router.get('/groupe', function (req, res) {
    res.send('admin page groupe');
});

router.get('/evenement', function (req, res) {
    res.sendFile(path.join(__dirname, "../vue/evenement/create.html"));
});


router.get('/creneau', function (req, res) {
    res.sendFile(path.join(__dirname, "../vue/creneau/selection.html"));
});

router.get('/creneau/read', function (req, res) {
    var prom =model_creneau.getAllcreneau();
    prom.then((value) => {

        res.send(value);

    }).catch(
        function (){
            console.log("y'a une erreur dans la fonction ")
            res.send("error");
        }
    );

});

router.get('/groupe', function (req, res) {
    res.send('admin page groupe');
});

module.exports = router;