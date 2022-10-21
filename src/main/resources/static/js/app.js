var app = (function(){
    allPlayersReady = function(){
        allready = false;
        index.toggleListo();
        apiclient.changeListo($('#nickname').val());
        console.log($('#nickname').val())
        //while (!allready){
            allready = JSON.parse($.ajax({type:'GET', url:'player/ready', async:false}).responseText);
            console.log(allready);
            if(allready){
                console.log("Todos listos");
            }
        //}
        
    },


    addPlayer = function(){
        var nickname = $("#nickname").val();
        index.disableInput();
        apiclient.addPlayer(nickname).then(() => {
            console.log("Jugador añadido");
        })
        .catch(error => console.log("No se pudo añadir el jugador"));
    }


    return{
        allPlayersReady:allPlayersReady,
        addPlayer:addPlayer
        
    }
})();
