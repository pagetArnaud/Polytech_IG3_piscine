
var bd= require(path.join(__dirname,"../lib/conf"));

//Promo
function addPromo(promo) {
    return new Promise((resolve, reject) => {

    bd.query ('INSERT INTO Promo (id) VALUES (?)',
        [promo],
        function(err, result){
            if (err){
                reject(err);
            }
            resolve(result);
        }
    );
    });
}

function getPromo(num) {
    return new Promise((resolve, reject) => {

    bd.query ('SELECT * FROM Promo WHERE id=?',
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


function getAllPromo() {
    return new Promise((resolve, reject) => {

        bd.query ('SELECT * FROM Promo',
            function(err, result){
                if (err){
                    reject(err);
                }
                resolve(result);
            }
        );
    });
}

module.exports={getAllPromo,getPromo,addPromo};