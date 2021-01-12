var model_creneau = require('../model/creneau');
function getCreneaux(req,res){
    var prom = model_creneau.getAllCreneauProf()
    prom.then((value) => {  //promesse realisee on recupere la valeur value et on affiche
        console.log(value)

        res.render("creneau/VisualisationCreneaux", {data: value});//la reponde de serveur est une vue/vue utilise les objets
    }).catch((error) => {  //fail de promesse on afiche erreur


            console.log(error);
            res.send(error);
        }
    );
}
module.exports={getCreneaux}