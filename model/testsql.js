path=require('path');
var etu=require(path.join(__dirname,'etudiant'));
var promo=require(path.join(__dirname,'promo'));
var event=require(path.join(__dirname,'evenement'));
event.addEvenement("Sta","01/01/2021",3,"02/01/2021",1.5,2,"IG3");
event.getAllEvenement();
event.getEvenement(5);