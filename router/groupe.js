var express = require('express');
var router = express.Router();
var controller_grp = require('../controller/groupe');

// Home page route.
router.get('/', function (req, res) {
    controller_grp.getGroupe(req,res)
});
// About page route.
router.get('/cree', function (req, res) {
    res.render("groupe/creation_groupe")

});

router.post('/cree', function (req, res) {
    controller_grp.addGroupe(req, res)
});

// About page route.
router.post('/alter', function (req, res) {
    res.render("groupe/modification_de_groupe",  {id:req.body.idGroupe})
});

router.post('/change', function (req, res){
    controller_grp.ModGroupe(req, res)
});

router.post('/delete', function (req, res) {
    controller_grp.DeleteGroupe(req, res)
});

module.exports = router;