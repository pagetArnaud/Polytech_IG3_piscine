const et = require("../model/etudiant")
var expV = require("express-validator")
var bcrypt = require("bcryptjs")
const {check, validationResult} = require('express-validator')
const promo = require ("../model/promo")
//promo.addPromo("IG3")
var auth = require("../lib/auth");
const admins = [15478546,14523891];

function CheckPW(passwordToCheck, hash) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(passwordToCheck, hash, (err, isMatch) => {
            if (err) reject(err);
            if (isMatch) {
                resolve('Mot de passe correct')
            } else {
                reject('Les mots de passes de correspondent pas')
            }

        })
    })
}

exports.login = (req, res) => {
    //console.log(req.body)
    const mail = req.body.email
    const mdp = req.body.password
    const pMailExists = et.getEtudiantMail(mail)

    pMailExists.then((result) => { //Si le mail est dans la bd
        console.log(result[0].mdp);
        const pPassMatches = CheckPW(mdp, result[0].mdp);
        pPassMatches.then((resultat) => {//Si les mdp sont identique
            console.log(resultat);
            var row = result[0];
            //On regarde si la personne qui vient de se login est un administrateur.
            console.log("Row num: " + row.num);

            if (admins.includes(row.num * 1)) {
                res.cookie("session", auth.cree(row.num, row.nom, row.prenom, true), {expires : 0}); //expires signifie que dès qu'on ferme le navigateur, le cookie est expiré
                res.redirect("/admin/")
            } else {
                res.cookie("session", auth.cree(row.num, row.nom, row.prenom, false), {expires : 0});
                res.redirect("/etu/")
            }
        }).catch((err) => {
            console.log(err);
            res.render('connexion/login', {alreadyRegistered : false, loginFailed : true})
        })
    }).catch((err) => {
        console.log("on est là")
        res.render('connexion/login', {alreadyRegistered : false, loginFailed : true})
    })
}