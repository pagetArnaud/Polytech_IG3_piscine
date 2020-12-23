var express = require('express');
var router = express.Router();
var controller_admin = require('../controller/admin');

// Home page route.
router.get('/', function (req, res) {
    controller_admin.login(req, res);
});

// About page route.
router.get('/groupe', function (req, res) {
    res.send('admin page groupe');
});

router.get('/evenement', function (req, res) {
    buildFile(req, res, path.join(__dirname, "../vue/evenement/create.ejs"));

});


router.get('/creneau', function (req, res) {
    controller_admin.getAllCreneau(req, res);
});


router.get('/groupe', function (req, res) {
    res.send('admin page groupe');
});

module.exports = router;