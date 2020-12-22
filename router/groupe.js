var express = require('express');
var router = express.Router();
var fs = require('fs');

function buildFile(req, res, chemin) {
    fs.readFile(path.join(__dirname, "../vue/commun/head.ejs"), function (err, head) {
        if (err) {
            console.log(err);
            res.status(404).send('Page introuvable !!!! ');
        } else {
            fs.readFile(chemin, function (err, data) {
                if (err) {
                    console.log(err);
                    res.status(404).send('Page introuvable !!!! ');
                } else {
                    fs.readFile(path.join(__dirname, "../vue/commun/footer.ejs"), function (err, footer) {
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
    buildFile(req, res, path.join(__dirname, "../vue/groupe/consultation_de_groupe.ejs"));

});
// About page route.
router.get('/cree', function (req, res) {
    buildFile(req, res, path.join(__dirname, "../vue/groupe/creation_groupe.ejs"));

});

// About page route.
router.get('/alter', function (req, res) {
    buildFile(req, res, path.join(__dirname, "../vue/groupe/modification_de_groupe.ejs"));

});


module.exports = router;