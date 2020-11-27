
var bd= require(path.join(__dirname,"../lib/conf"));

//creneau

function getcreneau(num,next) {
    bd.query ('SELECT * FROM creneau WHERE num=?',
        [num],
        function(err, result){
            if (err) throw err;
            next(result);
        }
    );
}
function getAllcreneau() {
    /*
    var res= bd.query ('SELECT * FROM creneau',
        function(err, result){
            if (err) throw err;
            next(result);
        }
    );*/
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