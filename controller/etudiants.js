var model_etudiant = require('../model/etudiant');
var model_creneau = require('../model/creneau');

var bd = require(path.join(__dirname, "../lib/conf"));//Temporaire

function login(req, res) {
    res.render("connexion/login", {alreadyRegistered: false, loginFailed: false})
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
            var idGroupe = value[0].groupe
            if (idGroupe) {//Si l'etudiant est bien dans un groupe

                prom = model_creneau.reserveCreneau(idGroupe, cren);
                prom.then((valeur) => {

                    res.redirect("./")

                }).catch((error) => {

                        console.log(error);
                        res.send(error);
                    }
                );
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