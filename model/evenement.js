
var bd= require(path.join(__dirname,"../lib/conf"));
var util=require("../lib/util");
//Evenement



function addEvenement(nom,dateDebut,dureeEvent,dateLimiteResa,dureeCreneau,nbJury,promo) {
    return new Promise((resolve, reject) => {
        bd.query ('INSERT INTO evenement (nom,dateDebut,dureeEvent,dateLimiteResa,dureeCreneau,nbJury,promo) VALUES (?,CAST(FROM_UNIXTIME(?) as date),?,CAST(FROM_UNIXTIME(?) as date),?,?,?)',
        [nom,util.datetoSQL(dateDebut),dureeEvent,util.datetoSQL(dateLimiteResa),dureeCreneau,nbJury,promo],
            function(err, result){
                if (err){
                    reject(err);
                }
                resolve(result);
            }
        );
    });
}

function getEvenement(id) {
    return new Promise((resolve, reject) => {

    bd.query ('SELECT * FROM evenement WHERE id=?',
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
function getAllEvenement() {
    return new Promise((resolve, reject) => {

        bd.query ('SELECT * FROM evenement',
            function(err, result){
                if (err){
                    reject(err);
                }
                resolve(result);
            }
        );
    });
}
function makedate(){
    return new Promise((resolve, reject) => {
        bd.query ('SELECT ',
            function(err, result){
                if (err){
                    reject(err);
                }
                resolve(result);
            }
        );
    });
}
module.exports={getAllEvenement,getEvenement,addEvenement,makedate};