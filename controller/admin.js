var model_creneau = require('../model/creneau');
var model_event = require('../model/evenement');
var model_group = require('../model/groupe');

function login(req, res) {
    res.render("connexion/login")
}

function getAllCreneau(req, res) {
    var prom = model_creneau.getAllcreneau();
    prom.then((value) => {
        res.render("creneau/selection", {creneau: value});

    }).catch(
        function () {
            console.log("y'a une erreur dans la fonction ")
            res.send("error");
        }
    );
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
       // console.log(value);
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
      //  console.log(value);
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

        res.send("Evenement créé !");

    }).catch(
        function (){
            console.log("Formulaire non rempli correctement")
            res.send("Formulaire non rempli correctement");
        }
    );
}


module.exports = {login, getAllCreneau, addEvenement, modif_creneau, consult_creneau, getCreneau, getGroupe};