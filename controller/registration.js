const etudiant = require("../model/etudiant")
var expV = require("express-validator")
var bcrypt = require("bcryptjs")
const {check, validationResult} = require('express-validator')
const promo = require ("../model/promo")
//promo.addPromo("IG3")

exports.checkDataIsValid = function (req, res, next) {
    next()
}
exports.renderSuccess = function (req, res) {
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

