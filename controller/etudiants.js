var model_etudiant = require('../model/etudiant');
var model_creneau = require('../model/creneau');
const promoModel = require('../model/promo');
var auth = require("../lib/auth");

var bd = require(path.join(__dirname, "../lib/conf"));//Temporaire

function login(req, res) {
    var cookie = req.cookies["session"];
    var token = auth.getTokenCookie(cookie);
    if (token) {
        if (token.isAdmin) {//Si on est bien un admin
            res.redirect('admin');
        } else {//sinon
            res.redirect('etu');
        }
    } else { //Si on ne peut pas decripter le token ou si le cookie n'existe pas, on demande de se re-login
        res.render("connexion/login", {alreadyRegistered: false, loginFailed: false})
    }
}

function register(req, res) {
    promo = promoModel.getAllPromo();
    promo.then((result) => {
        res.render("connexion/register", {promo : result})
    }).catch((err) => {
        console.log(err)
        res.render("connexion/register", {promo : []})
    })

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
    var etu = req.token;//Recupère info de l'étudiant
    var prom = model_creneau.getCreneauDispo();
    prom.then((value) => {

        res.render("creneau/reserverCreneau", {data: value, etu: etu});

    }).catch((error) => {

            console.log(error);
            res.send(error);
        }
    );
}

function create_resa_Creneau(req, res) {
    var etu = req.token;
    var cren = req.body.idCreneau;
    if (cren) {//Si on a bien un identifiant de créneau dans les parametres
        var groupe = getGroup(etu.numEtu);
        groupe.then((value) => {
            if (value[0]) {//Si l'etudiant est bien dans un groupe
                var idGroupe = value[0].groupe;

                prom = model_creneau.reserveCreneau(idGroupe, cren);
                prom.then((valeur) => {

                    res.redirect("../")

                }).catch((error) => {

                        console.log(error);
                        res.send(error);
                    }
                );
            } else {
                console.log("pas dans un groupe");
                res.redirect("../groupe");
            }
        }).catch((error) => {

                console.log(error);
                res.send(error);
            }
        );
    }
}

//Fonction temporaire tant que le controller/model groupe n'est pas mis en place
function getGroup(numEtu) {

    return new Promise((resolve, reject) => {

        bd.query("SELECT groupe FROM Composer WHERE etudiant=?",
            [numEtu],
            function (err, result) {
                if (err) {
                    reject(err);
                }

                resolve(result);
            }
        );
    });

}

module.exports = {login, register, get_creneau, resa_Creneau, create_resa_Creneau};