var express = require('express');
var router = express.Router();
var model_etudiant = require('../model/etudiant');
var model_creneau = require('../model/creneau');
var fs = require('fs');
var groupe = require(path.join(__dirname, "groupe"));
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var registration = require('../controller/registration');
router.use(urlencodedParser)
router.use(express.json())
const {check, validationResult} = require('express-validator/check');



function buildFile(req, res, chemin) {
    fs.readFile(path.join(__dirname, "../vue/commun/head.html"), function (err, head) {
        if (err) {
            console.log(err);
            res.status(404).send('Page introuvable !!!! ');
        } else {
            fs.readFile(chemin, function (err, data) {
                if (err) {
                    console.log(err);
                    res.status(404).send('Page introuvable !!!! ');
                } else {
                    fs.readFile(path.join(__dirname, "../vue/commun/footer.html"), function (err, footer) {
                        if (err) {
                            console.log(err);
                            res.status(404).send('Page introuvable !!!! ');
                        } else {
                            ouput = head.toString().concat(data.toString(), footer.toString());
                            res.send(ouput);
                        }
                    })
                }
            });
        }
    });
}

// Home page route.
router.get('/', function (req, res) {
    buildFile(req, res, path.join(__dirname, "../vue/connexion/login.html"));

});

router.get('/register', function (req, res) {
    buildFile(req, res, path.join(__dirname, "../vue/connexion/register.ejs"));

});

// About page route.
router.use('/groupe', groupe);

router.get('/creneau',
    function (req, res) {
        buildFile(req, res, path.join(__dirname, "../vue/creneau/selection.html"))
});

router.get('/creneau/read', function (req, res) {
    var prom =model_creneau.getAllcreneau();
    prom.then((value) => {

        res.send(value);

    }).catch(
        function (){
            console.log("y'a une erreur dans la fonction ")
        }
    );

});

router.post(
    '/register',
    [
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
    ],
    (req, res, next) => {
        const error = validationResult(req).formatWith(({ msg }) => msg);

        const hasError = !error.isEmpty();

        if (hasError) {
            console.log(error);
            res.render('connexion/registrationsuccessful', error)
        } else {
            next();
        }
    },
    registration.renderSuccess
);


router.post('/')
module.exports = router;