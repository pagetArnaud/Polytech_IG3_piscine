const etudiant = require("../model/etudiant")
var expV = require("express-validator")
var bcrypt = require("bcryptjs")
const {check, validationResult} = require('express-validator')
const promo = require ("../model/promo")
//promo.addPromo("IG3")

exports.checkDataIsValidAndSanitize = [
    check("firstname")
        .isLength({ min: 3 })
        .withMessage("Le prénom doit avoir au moins 3 lettres.")
        .trim(),
    check("name")
        .isLength({ min: 3 })
        .withMessage("Le nom doit avoir au moins 3 lettres.")
        .trim(),
    //TODO: verif num étudiant
    check("name")
        .isLength({ min: 3 })
        .withMessage("Le nom doit avoir au moins 3 lettres.")
        .trim(),

    check("email")
        .isEmail()
        .withMessage("Email invalide")
        .normalizeEmail(),

    check("password")
        .isLength({ min: 6, max: 15 })
        .withMessage("Merci d'entrer un mot de passe entre 6 et 15 caractères."),


    check("password2").custom((value, { req }) => {
        if (value !== req.body.password) {
            console.log(req.body.password, req.body.confirmPassword);
            throw new Error("Les mots de passe ne correspondent pas.");
        }
        return true;
    }),
]
exports.checkCorrectness = function (req, res, next) {
    const error = validationResult(req).formatWith(({ msg }) => msg);

    const hasError = !error.isEmpty();

    if (hasError) {
        console.log(error);
        res.render('connexion/register', {error : error.errors})
    } else {
        next();
    }
}
exports.correctForm = function (req, res) {
    //console.log(req.body)
    data = req.body
    name = data.name
    firstname = data.firstname
    email = data.email
    password = data.password
    num = data.studNo
    //TODO : OBTENIR LA PROMO
    //cryptage du mdp
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    console.log(hash)
    prom = etudiant.addEtudiant(num, name, firstname, email, hash, "IG3")
    prom.then(() => {
        //TODO : renvoyer vers la page d'accueil des étudiants avec un message disant que l'inscription s'est bien déroulée
        res.render('menu/index')
    }).catch(() => {
        //Si l'étudiant est déjà inscrit
        res.render('connexion/login', {alreadyRegistered : true})
    })
}

