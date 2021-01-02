const etudiant = require("../model/etudiant")
var expV = require("express-validator")
var bcrypt = require("bcryptjs")
const {check, validationResult} = require('express-validator')
const promo = require ("../model/promo")
var auth = require("../lib/auth");

exports.checkDataIsValidAndSanitize = [
    check("firstname")
        .isLength({ min: 3 })
        .withMessage("Le prénom doit avoir au moins 3 lettres.")
        .trim(),
    check("name")
        .isLength({ min: 3 })
        .withMessage("Le nom doit avoir au moins 3 lettres.")
        .trim(),
    check("studNo")
        .isLength({ min: 8 , max :8})
        .withMessage("Le numéro étudiant est composé de 8 chiffres, à ne pas confondre avec le code INE.")
        .trim(),
    check("email")
        .isEmail()
        .withMessage("Adresse e-mail invalide.")
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
    console.log(req.body)
    data = req.body
    num = data.studNo
    //cryptage du mdp
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(data.password, salt);
    console.log(hash)
    console.log(data.studNo, data.name, data.firstname, data.email, hash, data.promo)
    prom = etudiant.addEtudiant(data.studNo, data.name, data.firstname, data.email, hash, "IG3")
    prom.then(() => {
        var token = auth.cree(data.studNo, data.name, data.firstname, false);
        res.render('menu/index', {Registration : true})
    }).catch((err) => {
        //Si l'étudiant est déjà inscrit
        console.log(err)
    })
}

