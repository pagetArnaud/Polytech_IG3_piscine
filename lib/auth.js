var jwt = require('jsonwebtoken');

var clef = 'shhhhh'

function cree(numEtu, nom, prenom, isAdmin) {
    var object = {numEtu: numEtu, nom: nom, prenom: prenom, isAdmin: isAdmin};
    return jwt.sign(object, clef);

}

function decrypte(token) {
    //{numEtu:1234567890A,nom:dupont,prenom:jean,isAdmin:False}
    var decoded = jwt.verify(token, clef);
    if (decoded) {
        return decoded;
    }
    return false;
}
function getTokenCookie(cookie) {
    return new Promise((resolve, reject) => {
        if (cookie) {//Si le cookies existe
            token = decrypte(cookie);
            if (token !== false) {//Si c'est bien le token de session et qu'on peut le decrypter
                resolve(token);
            } else {
                reject("Can't decrypt token")
            }
        } else {
            reject("No cookie")
        }
    })
}

module.exports = {cree, decrypte, getTokenCookie};