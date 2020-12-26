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

module.exports = {cree, decrypte}