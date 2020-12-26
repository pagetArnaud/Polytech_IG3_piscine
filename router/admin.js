var express = require('express');
var router = express.Router();
var model_etudiant = require('../model/etudiant');
var model_creneau = require('../model/creneau');
var model_event = require("../model/evenement");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post(urlencodedParser)
router.use('/evenement', urlencodedParser)


/*
router.post("/evenement", function(req, res){
    console.log("oui")
});
/*
router.get('/evenement', function (req, res) {
    res.send("ça marche");
});*/
router.post("/evenement", function (req, res) {
    var prom = model_event.addEvenement(req.body.name,req.body.dateDebut,req.body.dureeEvent,req.body.dateLimiteResa,req.body.dureeCreneau,req.body.nbrJury,req.body.promo);
    prom.then((value) => {

        res.send("Evenement créé !");

    }).catch(
        function (){
            console.log("Formulaire non rempli correctement")
            res.send("Formulaire non rempli correctement");
        }
    );
});
/*
router.post('/evenement', function (req, res) {
    console.log(req.body);
});*/
var controller_admin = require('../controller/admin');

// Home page route.
router.get('/', function (req, res) {
    controller_admin.login(req, res);
});

// About page route.
router.get('/groupe', function (req, res) {
    res.send('admin page groupe');
});

router.get('/evenement', function (req, res) {
    res.sendFile(path.join(__dirname, "../vue/evenement/create.html"));
    model_creneau.getcreneau(req.body.num);
});


router.get('/creneau', function (req, res) {
    controller_admin.getAllCreneau(req, res);
});

router.get('/creneau/consultation', function (req, res) {
    res.sendFile(path.join(__dirname, "../vue/creneau/consultation_creneau.html"));
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


module.exports = router;