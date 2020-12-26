const et = require("../model/etudiant")
var expV = require("express-validator")
var bcrypt = require("bcryptjs")
const {check, validationResult} = require('express-validator')
const promo = require ("../model/promo")
//promo.addPromo("IG3")
var auth = require("../lib/auth");

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

exports.login = (req, res, next) => {
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
            //TODO si c'est un admin changer isAdmin

            var token = auth.cree(row.num, row.nom, row.prenom, false);
            res.cookie("session", token);

            res.render('menu/index')


        }).catch((err) => {
            console.log(err)
            res.render('connexion/login', {alreadyRegistered : false, loginFailed : true})
        })
    }).catch((err) => {
        res.render('connexion/login', {alreadyRegistered : false, loginFailed : true})
    })
}