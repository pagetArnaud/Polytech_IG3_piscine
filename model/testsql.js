path=require('path');
var etu=require(path.join(__dirname,'etudiant'));
var promo=require(path.join(__dirname,'promo'));
var event=require(path.join(__dirname,'evenement'));
event.addEvenement("Stage","01/01/2021",3,"02/01/2021",1.5,2,"IG3");
event.getAllEvenement();
/*d=new Date("2020/10/10".split("/"));
stamp=d.getTime().toString().slice(0,-3);
*/