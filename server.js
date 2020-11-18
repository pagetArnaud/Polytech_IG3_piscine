var express = require('express');
var app = express();
var http = require('http').Server(app);


app.get("/", function (req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('hello world');


});

app.use(function (req, res) {
    res.setHeader('Content-Type', 'text/plain');
    //console.log(req)
    res.status(404).send('Page introuvable !!!!');

});

http.listen(process.env.PORT, function () {
    console.log('Listening  ')
});