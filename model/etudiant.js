
var bd= require(path.join(__dirname,"../lib/conf"));

//Etudiant
function addEtudiant(num,nom,prenom,mail,mdp,promo) {

    var res=bd.query ('INSERT INTO Etudiant (num, nom, prenom, mail, mdp,promo) VALUES (?,?,?,?,?,?)',
        [num,nom,prenom,mail,mdp,promo],
        function(err, result){
            if (err) throw err;
            console.log(result);
        }
    );
}

function getEtudiant(num) {
    bd.query ('SELECT * FROM Etudiant WHERE num=?',
        [num],
        function(err, result){
            if (err) throw err;
            console.log(result);
        }
    );
}
function getAllEtudiant() {
    var res= bd.query ('SELECT * FROM Etudiant',
        function(err, result){
            if (err) throw err;
            console.log(result);
        }
    );
}


module.exports={getAllEtudiant,getEtudiant,addEtudiant};