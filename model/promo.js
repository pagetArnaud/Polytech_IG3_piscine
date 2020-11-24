
var bd= require(path.join(__dirname,"../lib/conf"));

//Promo
function addPromo(promo) {

    var res=bd.query ('INSERT INTO Promo (id) VALUES (?)',
        [promo],
        function(err, result){
            if (err) throw err;
            console.log(result);
        }
    );
}

function getPromo(num) {
    bd.query ('SELECT * FROM Promo WHERE id=?',
        [num],
        function(err, result){
            if (err) throw err;
            console.log(result);
        }
    );
}
function getAllPromo() {
    var res= bd.query ('SELECT * FROM Promo',
        function(err, result){
            if (err) throw err;
            console.log(result);
        }
    );
}

module.exports={getAllPromo,getPromo,addPromo};