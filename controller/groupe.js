  
var model_groupe = require('../model/groupe');

function getGroupe(req, res) {
    var prom = model_groupe.getGroupeEleve(req.token.numEtu);
    
    prom.then((value) => {
        
        res.render('groupe/consultation_de_groupe', {groupe:value})

    }).catch((error) => {

            console.log(error);
            res.send(error);
        }
    );
    
}

function addGroupe(req, res) {
    var prom = model_groupe.addGroupe(req.body.NomTuteur, req.body.PrenomTuteur, req.body.EntrepriseTut, req.body.Prof, req.body.nomGrp);
    prom.then((value) => {
        var idGroupe = value.insertId;//Id du groupe qui vient d'être insert
        var id0 = req.token.numEtu;
        var idA = req.body.numEleveB;
        var idB = req.body.numEleveB;
        var idC = req.body.numEleveC;
        var idD = req.body.numEleveD;
        var idE = req.body.numEleveE;

        if (0 == model_groupe.checkEtu(id0)) {//check si l'élève existe
            var prom0 = model_groupe.DeleteGrpLast()
        } else {
            var prom0 = model_groupe.addComposer(id0, idGroupe)
        }

        if ("" != idA) {//check pour savoir combien y a d'élèves à rajouter (max 5)
            if (0 == model_groupe.checkEtu(idA)) {//check si l'élève existe
                var prom1 = 1;
            } else {
                var prom1 = model_groupe.addComposer(idA, idGroupe)
            }
        }
        if (""!=idB) {//check pour savoir combien y a d'élèves à rajouter (max 5)        
            if (0==model_groupe.checkEtu(idB)) {//check si l'élève existe
                var prom2 = 1;
            } else {
                var prom2 = model_groupe.addComposer(idB, idGroupe)
            }
        }
        if (""!=idC) {//check pour savoir combien y a d'élèves à rajouter (max 5)        
            if (0==model_groupe.checkEtu(idC)) {//check si l'élève existe
                var prom3 = 1;
            } else {
                var prom3 = model_groupe.addComposer(idC, idGroupe)
            }
        }
        if (""!=idD) {//check pour savoir combien y a d'élèves à rajouter (max 5)        
            if (0==model_groupe.checkEtu(idD)) {//check si l'élève existe
                var prom4 = 1;
            } else {
                var prom4 = model_groupe.addComposer(idD, idGroupe)
            }
        }
        if (""!=idE) {//check pour savoir combien y a d'élèves à rajouter (max 5)        
            if (0==model_groupe.checkEtu(idE)) {//check si l'élève existe
                var prom5 = 1;
            } else {
                var prom5 = model_groupe.addComposer(idE, idGroupe)
            }
        }
        Promise.all([prom0, prom1, prom2, prom3, prom4, prom5]).then((value) => {
            res.redirect('/etu/groupe/')
        }).catch((error) => {
    
            console.log(error);

            res.redirect('/etu/groupe/')
            }
        );

    

    }).catch((error) => {

        console.log(error);

        res.redirect('/etu/groupe/')
    });
    
}

function ModGroupe(req, res) { //on regarde où on doit faire une modification
    var prom = 1 ;
    var prom1 = 1 ;
    var prom2 = 1 ;
    var prom3 = 1 ;
    var prom4 = 1 ;
    var prom5 = 1 ;
    var prom6 = 1 ;
    var prom7 = 1 ;
    var prom8 = 1 ;
    var prom10 = 1 ;
    var prom9 = 1 ;
    
    if (req.body.NomGroupe != "") {
        var prom = model_groupe.modNomGroupe(req.body.idGroupe, req.body.NomGroupe)
    }
    if (req.body.NomTuteur != "") {
        var prom1 = model_groupe.modNomTuteur(req.body.idGroupe, req.body.NomTuteur)
    }
    if (req.body.PrenomTuteur != "") {
        var prom2 = model_groupe.modPrenomTuteur(req.body.idGroupe, req.body.PrenomTuteur)
    }
    if (req.body.EntrepriseTut != "") {
        var prom3 = model_groupe.modEntrepriseTut(req.body.idGroupe, req.body.EntrepriseTut)
    }
    if (req.body.Prof != "") {
        var prom4 = model_groupe.modProf(req.body.idGroupe, req.body.Prof)
    }
    if (req.body.numEleveA != "" || req.body.numEleveB != "" || req.body.numEleveC != "" || req.body.numEleveD != "" || req.body.numEleveE != "" ) {
        var prom5 = model_groupe.DeleteGrpc(req.body.idGroupe);
        if (req.body.numEleveA != "") {
            var prom6 = model_groupe.addComposer(req.body.numEleveA, req.body.idGroupe)
        }
        if (req.body.numEleveB != "") {
            var prom7 = model_groupe.addComposer(req.body.numEleveB, req.body.idGroupe)
        }
        if (req.body.numEleveC != "") {
            var prom8 = model_groupe.addComposer(req.body.numEleveC, req.body.idGroupe)
        }
        if (req.body.numEleveD != "") {
            var prom9 = model_groupe.addComposer(req.body.numEleveD, req.body.idGroupe)
        }
        if (req.body.numEleveE != "") {
            var prom10 = model_groupe.addComposer(req.body.numEleveE, req.body.idGroupe)
        }
        var prom11 = model_groupe.addComposer(req.token.numEtu, req.body.idGroupe)
    }
    Promise.all([prom, prom1, prom2, prom3, prom4, prom5, prom6, prom7, prom8, prom10, prom9, prom11]).then((value) => {
        res.redirect('/etu/groupe/')

    }).catch((error) => {

            console.log(error);

        res.redirect('/etu/groupe/')
        }
    );
    
}

//TODO pas besoin de Delete GRPC, délète groupe suffit (delete ON CASCADE)
function DeleteGroupe(req, res) {
    var prom = model_groupe.DeleteGrpc(req.body.idGroupe)
    prom.then((value) => {
        var prom1 = model_groupe.DeleteGrp(req.body.idGrp)
        prom1.then((value) => {
            res.redirect('/etu/groupe/')
        
        }).catch((error) => {

            console.log(error);
            res.redirect('/etu/groupe/')
        }
    )}).catch((error) => {

            console.log(error);
            res.redirect('/etu/groupe/')
        }
    );

}


function ModPage(req, res) {
    var prom = model_groupe.getEleve(req.body.idGroupe);
    var idGroupe = req.body.idGroupe
    prom.then((value) => {
        var array = [,,,,]
        var j = 0
        
        for (var i of value) {
            array[j] = JSON.stringify(i.etudiant).replace('"', '').replace('"', '');
            j++;
        }
        
        res.render("groupe/modification_de_groupe",  {id:idGroupe,id1:array[0],id2:array[1],id3:array[2],id4:array[3],id5:array[4]})

    }).catch((error) => {

            console.log(error);
            res.send(error);
        }
    );
    
}


module.exports = {DeleteGroupe,getGroupe,addGroupe,ModGroupe,ModPage};