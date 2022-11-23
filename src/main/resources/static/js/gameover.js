var gameover = (function(){

    var borrarDatos = function(){
        setWinner();
    }

    var setWinner = function(){
        var winner = gameApiclient.getWinner().toUpperCase();
        var h2 = $('h2');
        h2.html(winner + " ES EL GRAN CONQUISTADOR!!");
    }

    var volverStart = function(){
        location.href = location.href.slice(0,-19);
    }


    return{
        borrarDatos:borrarDatos,
        volverStart: volverStart
    }
})();