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
        res.render('connexion/registrationsuccessful', error)
    } else {
        next();
    }
}
exports.correctForm = function (req, res) {
    console.log(req.body)
    data = req.body
    name = data.name
    firstname = data.firstname
    email = data.email
    password = data.password
    num = data.studNo
    console.log(name, firstname, email, password, num)
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(password, salt, function(err, hash){
            if(err){
                console.log(err);
            }
            password = hash;
            console.log(password)
            });
        });


    etudiant.addEtudiant(num, name, firstname, email, password, "IG3")
    res.render('connexion/registrationsuccessful', {data : req.body})
}

