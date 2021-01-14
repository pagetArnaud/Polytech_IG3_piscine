var express = require('express');
var router = express.Router();  //creer router
var controller_prof = require('../controller/enseignant');//creation des chemins d'acces


router.get('/', function (req, res) {
    controller_prof.getCreneaux(req,res)
});








    module.exports = router;