path = require("path")
var bd = require(path.join(__dirname, "../lib/conf"));


//fonction pour créer un Groupe
//TODO pas de "nomGrp" dans la table
function addGroupe(nomTuteurEntreprise,prenomTuteurEntreprise,nomEntreprise,TuteurEnseignant,nomGrp) {
    return new Promise((resolve, reject) => {
        bd.query('INSERT INTO Groupe (nomTuteurEntreprise,prenomTuteurEntreprise,nomEntreprise,TuteurEnseignant,nomGrp) VALUES (?,?,?,?,?)',
        [nomTuteurEntreprise,prenomTuteurEntreprise,nomEntreprise,TuteurEnseignant,nomGrp],
            function(err, result){
                if (err){

                    reject(err);
                }
                resolve(result);
            }
        );

    });
}

function addComposer(nomEtu, idGroupe) {
    return new Promise((resolve, reject) => {
        bd.query('INSERT INTO Composer (etudiant,Groupe) VALUES (?,?)',
            [nomEtu, idGroupe],
            function(err, result){
                if (err){
                    reject(err);
                }
                resolve(result);
            }
        );
    });
}

//donne les Groupes de l'élève
function getGroupeEleve(IdEleve) {
    return new Promise((resolve, reject) => {

        bd.query('SELECT * FROM Groupe WHERE id IN (SELECT Groupe FROM Composer WHERE etudiant=?) ',
        [IdEleve],
        function(err, result){
            if (err){
                reject(err);
            }
            resolve(result);
        }
    );
    });
}


function checkEtu(num) { //fonction qui vérifie qu'un numéro pour créer un Groupe est bien celui d'un étudiant
    return new Promise((resolve, reject) => {

        bd.query('SELECT COUNT(0) FROM Etudiant WHERE num=? ',
            [num],
            function(err, result){
                if (err){
                    reject(err);
                }
                resolve(result);
            }
        );
        });
}

function modNomGroupe(numGrp, nom) {
    return new Promise((resolve, reject) => {

        bd.query('UPDATE Groupe SET nomGrp = ? WHERE id=?',
            [nom, numGrp],
            function(err, result){
                if (err){

                    reject(err);
                }

                resolve(result);
            }
        );
        });
}


function modNomTuteur(numGrp, nom) {
    return new Promise((resolve, reject) => {

        bd.query('UPDATE Groupe SET NomTuteurEntreprise = ? WHERE id=?',
            [nom,numGrp],
            function(err, result){
                if (err){
                    reject(err);
                }
                resolve(result);
            }
        );
        });
}

function modPrenomTuteur(numGrp, nom) {
    return new Promise((resolve, reject) => {

        bd.query('UPDATE Groupe SET prenomTuteurEntreprise = ? WHERE id=?',
            [nom,numGrp],
            function(err, result){
                if (err){
                    reject(err);
                }
                resolve(result);
            }
        );
        });
}

function modEntrepriseTut(numGrp, nom) {
    return new Promise((resolve, reject) => {

        bd.query('UPDATE Groupe SET nomEntreprise = ? WHERE id=?',
            [nom,numGrp],
            function(err, result){
                if (err){
                    reject(err);
                }
                resolve(result);
            }
        );
        });
}

function modProf(numGrp, num) {
    return new Promise((resolve, reject) => {

        bd.query('UPDATE Groupe SET TuteurEnseignant = ? WHERE id=? ',
            [num,numGrp],
            function(err, result){
                if (err){
                    reject(err);
                }
                resolve(result);
            }
        );
        });
}

function modnumEleve(numGrp, num) {
    return new Promise((resolve, reject) => {

        bd.query('INSERT INTO Composer (etudiant,Groupe) VALUES (?,?)',
            [num,numGrp],
            function(err, result){
                if (err){
                    reject(err);
                }
                resolve(result);
            }
        );
        });
}

function DeleteGrpc(numGrp) {
    return new Promise((resolve, reject) => {
        parseInt(numGrp)
        bd.query('DELETE FROM Composer WHERE Groupe = ?',
            [numGrp],
            function(err, result){
                if (err){
                    reject(err);
                }
                resolve(result);
            }
        );
        });
}

function DeleteGrp(numGrp) {
    return new Promise((resolve, reject) => {
        parseInt(numGrp)
        bd.query('DELETE FROM Groupe WHERE id = ?',
            [numGrp],
            function(err, result){
                if (err){
                    reject(err);
                }
                resolve(result);
            }
        );
        });
}

function DeleteGrpLast() {
    return new Promise((resolve, reject) => {

        bd.query('DELETE FROM Groupe WHERE id = (SELECT MAX(id) FROM Groupe)',

            function(err, result){
                if (err){
                    reject(err);
                }
                resolve(result);
            }
        );
        });
}
function getGroupe(id) {
    return new Promise((resolve, reject) => {
        bd.query('SELECT * FROM Groupe WHERE id=?',
            [id],
            function(err, result){
                if (err){
                    reject(err);
                }
                resolve(result);
            }
        );
    });
}

function getEleve(idGroupe) {
    return new Promise((resolve, reject) => {
        bd.query ('SELECT etudiant FROM composer WHERE groupe=?',
        [idGroupe],
            function(err, result){
                if (err){
                    
                    reject(err);
                }
                resolve(result);
            }
        );
        
    });
}
module.exports = {DeleteGrpLast,DeleteGrp,addGroupe,getGroupeEleve,checkEtu,DeleteGrpc,modnumEleve,modProf,modEntrepriseTut,modPrenomTuteur,modNomTuteur,modNomGroupe,addComposer,getEleve};