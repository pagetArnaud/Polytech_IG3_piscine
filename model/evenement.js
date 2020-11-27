
var bd= require(path.join(__dirname,"../lib/conf"));
var util=require("../lib/util");
//Evenement

function addEvenement(nom,dateDebut,dureeEvent,dateLimiteResa,dureeCreneau,nbJury,promo) {

    var res=bd.query ('INSERT INTO Evenement (nom,dateDebut,dureeEvent,dateLimiteResa,dureeCreneau,nbJury,promo) VALUES (?,CAST(FROM_UNIXTIME(?) as date),?,CAST(FROM_UNIXTIME(?) as date),?,?,?)',
        [nom,util.datetoSQL(dateDebut),dureeEvent,util.datetoSQL(dateLimiteResa),dureeCreneau,nbJury,promo],
        function(err, result){
            if (err) throw err;
            console.log(result);
        }
    );
}

function getEvenement(num) {
    bd.query ('SELECT * FROM Evenement WHERE num=?',
        [num],
        function(err, result){
            if (err) throw err;
            console.log(result);
        }
    );
}
function getAllEvenement() {
    var res= bd.query ('SELECT * FROM Evenement',
        function(err, result){
            if (err) throw err;
            console.log(result);
        }
    );
}

function makedate(){
    var res= bd.query ('SELECT ',
        function(err, result){
            if (err) throw err;
            console.log(result);
        }
    );
}

module.exports={getAllEvenement,getEvenement,addEvenement,makedate};