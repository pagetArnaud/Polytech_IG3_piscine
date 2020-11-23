
var express = require('express');
var router = express.Router();

// Home page route.
router.get('/', function (req, res) {
    res.send('etu home page');
});

// About page route.
router.get('/groupe', function (req, res) {
    res.send('etu page groupe');
});

router.get('/creneau', function (req, res) {
    res.send('etu page creneau');
});
router.get('/groupe', function (req, res) {
    res.send('etu page groupe');
});

module.exports = router;