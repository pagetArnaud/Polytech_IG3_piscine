path = require("path")
var bd = require(path.join(__dirname, "../lib/conf"));


//fonction pour créer un groupe
function addGroupe(nomTuteurEntreprise,prenomTuteurEntreprise,nomEntreprise,TuteurEnseignant,nomGrp) {
    return new Promise((resolve, reject) => {
        bd.query ('INSERT INTO groupe (nomTuteurEntreprise,prenomTuteurEntreprise,nomEntreprise,TuteurEnseignant,nomGrp) VALUES (?,?,?,?,?,?)',
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

function addComposer(nomEtu,idGroupe) {
    return new Promise((resolve, reject) => {
        bd.query ('INSERT INTO composer (etudiant,groupe) VALUES (?,?)',
        [nomEtu,idGroupe],
            function(err, result){
                if (err){
                    
                    reject(err);
                }
                resolve(result);
            }
        );
        
    });

}

//donne les groupes de l'élève
function getGroupeEleve(IdEleve) {
    return new Promise((resolve, reject) => {

    bd.query ('SELECT * FROM groupe WHERE id IN (SELECT groupe FROM composer WHERE etudiant=?) ',
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



function checkEtu(num) { //fonction qui vérifie qu'un numéro pour créer un groupe est bien celui d'un étudiant
    return new Promise((resolve, reject) => {

        bd.query ('SELECT COUNT(0) FROM etudiant WHERE num=? ',
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

        bd.query ('UPDATE groupe SET nomGrp = ? WHERE id=?',
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

        bd.query ('UPDATE groupe SET NomTuteurEntreprise = ? WHERE id=?',
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

        bd.query ('UPDATE groupe SET prenomTuteurEntreprise = ? WHERE id=?',
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

        bd.query ('UPDATE groupe SET nomEntreprise = ? WHERE id=?',
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

        bd.query ('UPDATE groupe SET TuteurEnseignant = ? WHERE id=? ',
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

        bd.query ('INSERT INTO composer (etudiant,groupe) VALUES (?,?)',
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
        bd.query ('DELETE FROM composer WHERE groupe = ?',
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
        bd.query ('DELETE FROM groupe WHERE id = ?',
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
        
        bd.query ('DELETE FROM groupe WHERE id = (SELECT MAX(id) FROM groupe)',
            
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