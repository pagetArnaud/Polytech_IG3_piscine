var jwt = require('jsonwebtoken');

var clef = 'shhhhh';

function cree(numEtu, nom, prenom, promo, isAdmin) {
    var object = {numEtu: numEtu, nom: nom, prenom: prenom, promo: promo, isAdmin: isAdmin};
    return jwt.sign(object, clef);

}

function decrypte(token) {
    //{numEtu:1234567890A,nom:dupont,prenom:jean,promo:IG3,isAdmin:False}
    var decoded = jwt.verify(token, clef);
    if (decoded) {
        return decoded;
    }
    return false;
}

function getTokenCookie(cookie) {

    if (cookie) {//Si le cookies existe
        token = decrypte(cookie);
        if (token !== false) {//Si c'est bien le token de session et qu'on peut le decrypter
            return token;
        } else {
            console.log("Can't decrypt token");

        }
    } else {
        console.log("No cookie")
    }
    return;
}

module.exports = {cree, decrypte, getTokenCookie};