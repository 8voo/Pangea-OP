var app = (function(){
    allPlayersReady = function(){
        allready = false;
        while (!allready){
            allready = JSON.parse($.ajax({type:'GET', url:'player/ready', async:false}).responseText);
            if(allready){
                console.log("Todos listos");
            }
        }
        
    },

    toggleListo = function(){
        index.toggleListo();
    },

    addPlayer = function(){
        var nickname = $("#nickname").val();
        console.log(nickname);
        apiclient.addPlayer(nickname).then(() => {
            console.log("añadioestamondaaaaaa");
        })
        .catch(error => console.log("noañadioestamondaaaaaa"));
    }


    return{
        toggleListo: toggleListo,
        addPlayer:addPlayer
        
    }
})();
