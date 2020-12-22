var express = require('express');
var router = express.Router();
var model_etudiant = require('../model/etudiant');
var model_creneau = require('../model/creneau');
var fs = require('fs');
var groupe = require(path.join(__dirname, "groupe"));
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var registration = require('../controller/registration');
router.use(urlencodedParser)
router.use(express.json())
const {check, validationResult} = require('express-validator');



function buildFile(req, res, chemin) {
    fs.readFile(path.join(__dirname, "../vue/commun/head.html"), function (err, head) {
        if (err) {
            console.log(err);
            res.status(404).send('Page introuvable !!!! ');
        } else {
            fs.readFile(chemin, function (err, data) {
                if (err) {
                    console.log(err);
                    res.status(404).send('Page introuvable !!!! ');
                } else {
                    fs.readFile(path.join(__dirname, "../vue/commun/footer.html"), function (err, footer) {
                        if (err) {
                            console.log(err);
                            res.status(404).send('Page introuvable !!!! ');
                        } else {
                            ouput = head.toString().concat(data.toString(), footer.toString());
                            res.send(ouput);
                        }
                    })
                }
            });
        }
    });
}

// Home page route.
router.get('/', function (req, res) {
    buildFile(req, res, path.join(__dirname, "../vue/connexion/login.html"));

});

router.get('/register', function (req, res) {
    buildFile(req, res, path.join(__dirname, "../vue/connexion/register.ejs"));

});

// About page route.
router.use('/groupe', groupe);

router.get('/creneau',
    function (req, res) {
        buildFile(req, res, path.join(__dirname, "../vue/creneau/selection.html"))
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

router.post('/register', registration.checkDataIsValidAndSanitize, registration.checkCorrectness, registration.correctForm);

module.exports = router;