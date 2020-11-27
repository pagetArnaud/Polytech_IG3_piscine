
var bd= require(path.join(__dirname,"../lib/conf"));

//Etudiant
function addEtudiant(num,nom,prenom,mail,mdp,promo) {
    return new Promise((resolve, reject) => {

        bd.query ('INSERT INTO Etudiant (num, nom, prenom, mail, mdp,promo) VALUES (?,?,?,?,?,?)',
        [num,nom,prenom,mail,mdp,promo],
        function(err, result){
            if (err){
                reject(err);
            }
            resolve(result);
        }
        );
    });
}

function getEtudiant(num) {
    return new Promise((resolve, reject) => {

        bd.query ('SELECT * FROM Etudiant WHERE num=?',
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
function getAllEtudiant() {
    return new Promise((resolve, reject) => {
    bd.query ('SELECT * FROM Etudiant',
        function(err, result){
            if (err){
                reject(err);
            }
            resolve(result);
        }
    );
});
}


module.exports={getAllEtudiant,getEtudiant,addEtudiant};