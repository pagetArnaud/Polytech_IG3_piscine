var bd= require('../lib/conf');

bd.query("SELECT * FROM Promo",function(err, result){
    if (err) throw err;
    console.log(result);
});


bd.query ('SELECT * FROM Promo WHERE id =? OR id= ?',
    ["IG3","IG4"],
    function(err, result){
        if (err) throw err;
        console.log (result);
    }
);
