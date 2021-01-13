var model_creneau = require('../model/creneau');
var model_event = require('../model/evenement');
var model_group = require('../model/groupe');

function login(req, res) {
    res.render("connexion/login")
}


function getCreneau(req, res) {
    var prom = model_creneau.getcreneau(req.body.num);
    prom.then((value) => {
        console.log(value);


    }).catch(
        function () {
            console.log("y'a une erreur dans la fonction ")
            res.send("error");
        }
    );
}


function modif_creneau(req, res) {
    var prom = model_creneau.getCreneauDispo();
    prom.then((value) => {

        res.render("creneau/modificationDeCreneaux", {data: value});

    }).catch((error) => {

            console.log(error);
            res.send(error);
        }
    );
}

function consult_creneau(req, res) {
    var prom = model_creneau.getAllcreneau();
    prom.then((value) => {

        res.render("creneau/consultation_creneau", {data: value});

    }).catch((error) => {

            console.log(error);
            res.send(error);
        }
    );
}
function getGroupe(req,res) {
    var prom = model_group.getGroupe(req.body.id);
    prom.then((value) => {
        console.log(value);


    }).catch(
        function () {
            console.log("y'a une erreur dans la fonction ")
            res.send("error");
        }
    );
}


function addEvenement(req, res) {
    var prom = model_event.addEvenement(req.body.name,req.body.dateDebut,req.body.dureeEvent,req.body.dateLimiteResa,req.body.dureeCreneau,req.body.nbrJury,req.body.promo);
    prom.then((value) => {

        //res.send("Evenement créé !");
        res.redirect('../')

    }).catch((error) => {
        console.log(error);
            res.send("Formulaire non rempli correctement");
        }
    );
}

function addCreneau(req, res) {
    var prom = model_creneau.addCreneau(req.body.dateCreneau,req.body.heureDebut,req.body.duree,req.body.heureFin,req.body.evenement,req.body.salle);
    prom.then((value) => {

        //res.send("Creneau créé !")
        res.redirect("/admin/creneau")

    }).catch((error) => {
            console.log(error);
            res.send("Formulaire non rempli correctement");
        }
    );
}

function reserveCreneau(req, res) {
    console.log(req.body.idGroupe);
    console.log(req.body.idCreneau);
    var prom = model_creneau.reserveCreneau(req.body.idGroupe,req.body.idCreneau);
    prom.then((value) => {
        console.log(value);
        res.redirect("../");

    }).catch(
        function (){
            res.send("Pas modifié");
        }
    );
}


module.exports = {login, addEvenement, modif_creneau, consult_creneau, getGroupe, reserveCreneau, addCreneau};