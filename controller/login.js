const etudiant = require("../model/etudiant")
var expV = require("express-validator")
var bcrypt = require("bcryptjs")
const {check, validationResult} = require('express-validator')
const promo = require ("../model/promo")
//promo.addPromo("IG3")
function CheckPW (hash, passwordToCheck) {
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

    pMailExists.then((result) => {
        console.log(result[0].mdp)
        const pPassMatches = CheckPW(result[0].mdp, mdp)
        pPassMatches.then((result) => {
            console.log(result)
            res.render('menu/index')
            //TODO: SESSION
        }).catch((err) => {
            console.log(err)
            res.render('connexion/login', {alreadyRegistered : false, loginFailed : true})
        })
    }).catch((err) => {
        res.render('connexion/login', {alreadyRegistered : false, loginFailed : true})
    })
}