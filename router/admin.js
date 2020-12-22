var express = require('express');
var router = express.Router();
var model_etudiant = require('../model/etudiant');
var model_creneau = require('../model/creneau');
var fs = require('fs');


function buildFile(req, res, chemin) {
    fs.readFile(path.join(__dirname, "../vue/commun/head.ejs"), function (err, head) {
        if (err) {
            console.log(err);
            res.status(404).send('Page introuvable !!!! ');
        } else {
            fs.readFile(chemin, function (err, data) {
                if (err) {
                    console.log(err);
                    res.status(404).send('Page introuvable !!!! ');
                } else {
                    fs.readFile(path.join(__dirname, "../vue/commun/footer.ejs"), function (err, footer) {
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
    buildFile(res, res, path.join(__dirname, "../vue/connexion/login.ejs"));
    // res.sendFile(path.join(__dirname, "../vue/connexion/login.ejs"));
});

// About page route.
router.get('/groupe', function (req, res) {
    res.send('admin page groupe');
});

router.get('/evenement', function (req, res) {
    buildFile(req, res, path.join(__dirname, "../vue/evenement/create.ejs"));
    //res.sendFile(path.join(__dirname, "../vue/evenement/create.ejs"));
});


router.get('/creneau', function (req, res) {
    buildFile(req, res, path.join(__dirname, "../vue/creneau/selection.ejs"));
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