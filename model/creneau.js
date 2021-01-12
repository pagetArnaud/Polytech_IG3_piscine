
var bd= require(path.join(__dirname,"../lib/conf"));

function getcreneau(num) {
    //Donne le créneau d'après son numero
    return new Promise((resolve, reject) => {
        bd.query('SELECT * FROM Creneau WHERE num=?',
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

function getCreneauEtu(numetu) {
    //Donne le créneau d'un etudiant d'après son numero d'etudiant
    return new Promise((resolve, reject) => {
        bd.query('SELECT * FROM Creneau c JOIN Composer com on c.groupe=com.groupe WHERE com.etudiant=?', [numetu],
            function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
    });
}

function getAllcreneau() {
    //Donne tout les créneaux
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

function getCreneauDispoOfPromo(promo) {
    return new Promise((resolve, reject) => {
        bd.query("SELECT * FROM Creneau c JOIN Evenement e on e.id=c.event WHERE e.promo=? and c.groupe is NULL", [promo],
            function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
    });
}

function getCreneauDispo() {
    //Donne la liste des créneaux disponible (= qui ne sont pas reservé par un groupe)
    return new Promise((resolve, reject) => {
        bd.query('SELECT * FROM Creneau WHERE groupe is NULL ',
            function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
    });
}

function reserveCreneau(idGroup, idCreneau) {
    return new Promise((resolve, reject) => {
        bd.query('CALL resa_creneau(?,?)', [idGroup, idCreneau],
            //resa_creneau(idGroup,idCreneau) suppose que idCreneau est dispo. Si le groupe a deja choisi un creneau,
            //alors on annule la resa du premier creneau et on reserve le creneau IdCreneau

            function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
    });
}
function getAllCreneauProf(){
    sql="SELECT c.date,c.heureDebut,c.salle,c.num,e.nom,e.prenom FROM Creneau c JOIN Composer g on g.groupe=c.groupe JOIN Etudiant e ON g.etudiant=e.num"
    return new Promise((resolve, reject) => {
        bd.query (sql,
            function(err, result){
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
    });
}


/*
function updateByGroup(groupe) {
    return new Promise((resolve, reject) => {
        bd.query ('UPDATE creneau SET date = ?, heureDebut = ?  WHERE groupe = ?', [groupe],
            function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
    });
}
*/

module.exports = {getAllcreneau, getcreneau, getCreneauEtu, getCreneauDispo, reserveCreneau, getCreneauDispoOfPromo,getAllCreneauProf};