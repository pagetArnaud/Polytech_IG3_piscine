var model_etudiant = require('../model/etudiant');
var model_creneau = require('../model/creneau');


function login(req, res) {
    res.render("connexion/login")
}

function register(req, res) {
    res.render("connexion/register")
}


function get_creneau(req, res) {
    var prom = model_creneau.getAllcreneau();

    prom.then((value) => {
        //console.log(value);
        console.log(res)
        res.render("creneau/consultationCreneau", {data: value});

    }).catch((error) => {

            console.log(error);
            res.send(error);
        }
    );
}

module.exports = {login, register, get_creneau};