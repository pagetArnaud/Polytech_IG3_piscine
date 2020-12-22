var model_etudiant = require('../model/etudiant');
var model_creneau = require('../model/creneau');

var idEtu = "000000000A" //on simule le login
function login(req, res) {
    res.render("connexion/login")
}

function register(req, res) {
    res.render("connexion/register")
}


function get_creneau(req, res) {
    var prom = model_creneau.getCreneauEtu(idEtu);

    prom.then((value) => {
        //console.log(value);
        res.render("creneau/consultationCreneau", {data: value[0]});

    }).catch((error) => {

            console.log(error);
            res.send(error);
        }
    );
}

module.exports = {login, register, get_creneau};