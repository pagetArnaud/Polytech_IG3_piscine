
var bd= require(path.join(__dirname,"../lib/conf"));

//creneau
//SELECT p.groupe,e.nom, e.prenom FROM Creneau c JOIN Participe p ON p.groupe=c.groupe JOIN Enseignant e ON p.enseignant=e.id
function getcreneau(num) {
    return new Promise((resolve, reject) => {
    bd.query ('SELECT * FROM creneau WHERE num=?',
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
function getAllcreneau() {
    return new Promise((resolve, reject) => {
        bd.query ('SELECT * FROM Creneau',
            function(err, result){
                if (err) {
                 reject(err);
                }
                resolve(result);
            });
    });
}


module.exports={getAllcreneau,getcreneau};