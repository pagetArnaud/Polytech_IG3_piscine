var express = require('express');
var router = express.Router();


// Home page route.
router.get('/', function (req, res) {
    res.render("groupe/consultation_de_groupe");

});
// About page route.
router.get('/cree', function (req, res) {
    res.render("groupe/creation_groupe.ejs")

});

// About page route.
router.get('/alter', function (req, res) {
    res.render("groupe/modification_de_groupe.ejs")
});


module.exports = router;