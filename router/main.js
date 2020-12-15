var express = require('express');
var app = express();
var http = require('http').Server(app);
var fs = require('fs');
var etu=require(path.join(__dirname,"etu"));
var admin=require(path.join(__dirname,"admin"));

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


app.get("/", function (req, res) {
    buildFile(req, res, path.join(__dirname, "../vue/connexion/index.html"));
    //res.sendFile(path.join(__dirname,"../vue/connexion/index.html"));

});
app.set('view engine', 'ejs');//pour utliser le moteur de view EJS


//Fonction personnel
app.get("/log", function (req, res) {
    let date = new Date().toISOString();
    date = date.substring(0, 10) + ".log";
    res.sendFile("/home/1607nono/admin/logs/sites/2020/sites-" + date);
});

app.use("/etu",etu);//routeur vers les etudiants
app.use("/admin",admin);//routeur admin

app.use(function (req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !!!! ');

});

http.listen(process.env.PORT, function () {
    console.log('Listening  ')
});