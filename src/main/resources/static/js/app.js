var app = (function(){
    allPlayersReady = function(){
        index.toggleListo();
        allready = false;
        apiclient.changeListo($('#nickname').val());
        console.log($('#nickname').val())
        // while (!allready){
            jugadores =JSON.parse($.ajax({type:'GET', url:'player', async:false}).responseText); 
            if(jugadores.length > 1 ){
                allready = JSON.parse($.ajax({type:'GET', url:'player/ready', async:false}).responseText);
            console.log(allready);
            if(allready){
                location.href = "http://localhost:8080/html/game.html"
                console.log("Todos listos");
            }
            }
        // }
    },


    addPlayer = function(){
        var nickname = $("#nickname").val();
        index.disableInput();
        apiclient.addPlayer(nickname).then(() => {
            console.log("Jugador añadido");
        })
        .catch(error => console.log("No se pudo añadir el jugador"));
    },

    connectAndSubscribe = function(){
        console.info('Connecting to WS...');
        var socket = new SockJS('/stompendstart');
        stompClient = Stomp.over(socket);
        
        //subscribe to /topic/TOPICXX when connections succeed
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/newpoint.' + id, function (ola) {
                console.log(id)
                messiCallback(ola);
            });
        });
    }

    return{
        allPlayersReady:allPlayersReady,
        addPlayer:addPlayer,
        conncect:function(){
        }
    }
})();
