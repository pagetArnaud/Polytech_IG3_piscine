
var bd= require(path.join(__dirname,"../lib/conf"));

//Evenement
function addEvenement(nom,dateDebut,dureeEvent,dateLimiteResa,dureeCreneau,nbJury,promo) {

    var res=bd.query ('INSERT INTO Evenement (nom,dateDebut,dureeEvent,dateLimiteResa,dureeCreneau,nbJury,promo) VALUES (?,?,?,?,?,?,?)',
        [nom,dateDebut,dureeEvent,dateLimiteResa,dureeCreneau,nbJury,promo],
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