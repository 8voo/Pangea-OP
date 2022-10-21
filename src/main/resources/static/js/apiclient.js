var apiclient = (function(){
    return{
        addPlayer: function(newName){
            var player = JSON.stringify({nickname:newName});
            console.log(player)
            return new Promise((resolve) => {
                resolve($.ajax({
                    type:"POST",
                    url:'player/',
                    data:player,
                    contentType: "application/json"
                }))
            })
        },

        changeListo: function(nickname){
            var boton = $('#listeado');
            if(boton.prop('nodeName') == "BUTTON"){
                var listo = JSON.stringify(true);
            }else{
                var listo = JSON.stringify(false);
            }
            
            $.ajax({
                type:'PUT',
                url:'player/' + nickname,
                data:listo,
                contentType: "application/json"
            })
        }
    }

})();