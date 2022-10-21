var index = (function(){
    var toggleListo = function(){
        var listo = $('#boton-listo');
        if(listo.prop('nodeName') == "BUTTON"){
            listo.text("✔");
            listo.removeAttr("id");
            listo.attr("id", "listeado");
        }else{
            listo = $("#listeado");
            listo.text("Listo!");
            listo.removeAttr("id");
            listo.attr("id", "boton-listo");
        }
    }

    return{
        toggleListo: toggleListo
    }
})()