function datetoSQL(date) {
    //Transforme un string de date sous format timestamp utiliser par Mysql
    //Format de date supporter: YYYY/MM/DD ou DD/MM/YYYY ou YYYY-MM-DD ou DD-MM-YYYY
    var d=date;
    if (date.includes("/")){
     d = d.split("/");
    }else {
        d = d.split("-");
    }
    if (d[0].length === 2) {//Si la date est indiquer en format fr
        d.reverse();
    }
    d=new Date(d);
    d = d.getTime().toString().slice(0, -3);

    return d;
};


module.exports = {datetoSQL};