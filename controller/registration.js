const etudiant = require("../model/etudiant")


exports.sanityCheck= function(req, res, next) {

    next();
}
exports.renderSuccess = function (req, res) {
        console.log(req.body)
        res.render('connexion/registrationsuccessful', {data : req.body})
}
