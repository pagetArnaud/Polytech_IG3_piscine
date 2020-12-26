var model_etudiant = require('../model/etudiant');
var model_creneau = require('../model/creneau');


function login(req, res) {
    res.render("connexion/login", {alreadyRegistered : false, loginFailed : false})
}

function register(req, res) {
    res.render("connexion/register")
}


function get_creneau(req, res) {
    var etu = req.token;
    var prom = model_creneau.getCreneauEtu(etu.numEtu);

    prom.then((value) => {

        res.render("creneau/consultationCreneau", {data: value[0], etu: etu});

    }).catch((error) => {

            console.log(error);
            res.send(error);
        }
    );
}

function resa_Creneau(req, res) {
    var etu = req.token;
    var prom = model_creneau.getCreneauDispo();
    prom.then((value) => {

        res.render("creneau/reserverCreneau", {data: value, etu: etu});

    }).catch((error) => {

            console.log(error);
            res.send(error);
        }
    );
}

module.exports = {login, register, get_creneau, resa_Creneau};