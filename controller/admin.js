var model_creneau = require('../model/creneau');

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

module.exports = {login, getAllCreneau};