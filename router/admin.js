var express = require('express');
var router = express.Router();
var model_etudiant = require('../model/etudiant');
var model_creneau = require('../model/creneau');
var model_event = require("../model/evenement");
var bodyParser = require("body-parser");
var controller_admin = require('../controller/admin');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post(urlencodedParser)
router.use('/evenement', urlencodedParser)


//Envoie formulaire à bdd
router.post("/evenement", function (req, res) {
    controller_admin.addEvenement(req, res);
});


/*
router.post("/creneau/modification", function (req, res) {
    console.log("salut");
    model_creneau.updateByGroup(req.body.groupe);

});*/


// Home page route.
router.get('/', function (req, res) {
    controller_admin.login(req, res);
});

// About page route.
router.get('/groupe', function (req, res) {
    res.send('admin page groupe');
});

router.get('/evenement', function (req, res) {
    res.render(path.join(__dirname, "../vue/evenement/create"));
    model_creneau.getcreneau(req.body.num);
});


router.get('/creneau', function (req, res) {
    controller_admin.getAllCreneau(req, res);
});


router.get('/creneau/modification', function (req, res) {
    //res.render(path.join(__dirname, "../vue/creneau/modificationDeCreneaux"));
    controller_admin.modif_creneau(req, res);
});

router.post('/creneau/modification', function(req,res) {
    controller_admin.getCreneau(req, res);



});
router.post('/creneau/modification', function(req,res) {
    controller_admin.getGroupe(req, res);

});


router.get('/creneau/consultation', function (req, res) {
    //res.render(path.join(__dirname, "../vue/creneau/consultation_creneau"));
    controller_admin.consult_creneau(req, res);
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