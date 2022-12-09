var index = (function(){
    var toggleListo = function(){
        console.log("prueba listo");
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

    var disableInput = function(){
        var input = $('#nickname');
        input.prop('disabled', true);
    }

    return{
        toggleListo: toggleListo,
        disableInput:disableInput
    }
})()