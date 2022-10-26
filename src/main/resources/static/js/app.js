var app = (function(){
    allPlayersReady = function(){
        index.toggleListo();
        allready = false;
        apiclient.changeListo($('#nickname').val());
        stompClient.send("/topic/ready.", {}, JSON.stringify("Jugador"+ nickname+"listo"));
    },


   

    addPlayer = function(){
        var nickname = $("#nickname").val();
        $("#crear").hide();
        $("#boton-listo").show();
        if (nickname){
            index.disableInput();
            apiclient.addPlayer(nickname).then(() => {
                console.log("Jugador añadido");
            })
            .catch(error => console.log("No se pudo añadir el jugador"));
        } else {
            alert("El Nickname no puede ser vacio");
        }
    },


    redirect = function(){
        jugadores =JSON.parse($.ajax({type:'GET', url:'player', async:false}).responseText); 
        if(jugadores.length > 1 ){
            allready = JSON.parse($.ajax({type:'GET', url:'player/ready', async:false}).responseText);
            console.log(allready);
            if(allready){
                localStorage.nickname = JSON.stringify($("#nickname").val());
                localStorage.iniciado = JSON.stringify(false);
                console.log("local" + localStorage.iniciado);
                location.href += "html/game.html"
                console.log("Todos listos");
            }
        }
    },

    connectAndSubscribe = function(){
        console.info('Connecting to WS...');
        var socket = new SockJS('/stompendstart');
        stompClient = Stomp.over(socket);
        
        //subscribe to /topic/TOPICXX when connections succeed
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/ready.', function () {
                redirect();
            });
        });
    }

    return{
        allPlayersReady:allPlayersReady,
        addPlayer:addPlayer,
        connect:function(){
            connectAndSubscribe();
        }
    }
})();
