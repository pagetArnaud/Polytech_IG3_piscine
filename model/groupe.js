path = require("path")
var bd = require(path.join(__dirname, "../lib/conf"));



function getGroupe(id) {
    return new Promise((resolve, reject) => {
        bd.query ('SELECT * FROM groupe WHERE id=?',
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


module.exports={getGroupe};