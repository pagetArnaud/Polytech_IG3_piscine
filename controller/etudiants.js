var model_etudiant = require('../model/etudiant');
var model_creneau = require('../model/creneau');
const promoModel = require('../model/promo')

function login(req, res) {
    res.render("connexion/login", {alreadyRegistered : false, loginFailed : false})
}

function register(req, res) {
    promo = promoModel.getAllPromo()
    promo.then((result) => {
        res.render("connexion/register", {promo : result})
    }).catch((err) => {
        console.log(err)
        res.render("connexion/register", {promo : []})
    })

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