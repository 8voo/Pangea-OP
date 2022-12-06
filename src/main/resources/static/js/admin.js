var powerIcons = {
    TripleClick : "../img/click.png", 
    DeleteSoldados : "../img/soldado.png", 
    Freeze : "../img/winter.png"
}

var admins = ["engosuca@hotmail.com", "yesid@engosucahotmail.onmicrosoft.com"]

var game = (function(){
    var self = this;
    console.log("info " + localStorage.infoUsuario)
    self.iniciado = false;
    if (localStorage.infoUsuario != undefined){
        admins.forEach(admin => {
            if (admin == JSON.parse(localStorage.infoUsuario).toLowerCase()){
                self.iniciado = true;
                console.log("messi");
            }
        });
    }
    if (iniciado == false){
        document.getElementById("admin-view").style.display = "none";
        document.getElementById("not-logged").style.display = "block";
    }
    self.iconImage = ko.observable(powerIcons["TripleClick"]);
    self.activePower = "TripleClick";
    self.players = ko.observable(JSON.parse($.ajax({type:'GET', url:'../player', async:false}).responseText).slice(0,5));
    
    //Añade las naciones al mapa y asigna una nacion de inicio a cada jugador
    self.añadirNacionesMapa = function(){
        gameApiclient.getNations();
        var gameMap = $("#game-map");

        for (i = 1; i <= 35; i++){
            gameMap.append('<div class="grid-item" id = "nation' + i + '"><div class = "nationSoldiers">10</div></div>');
            var currentNation = "nation" + i;
            $("#" + currentNation).on("click", (function(currentNation){
                return function(){
                    self.formNations(currentNation);
                };
            })(currentNation));
        }


        //Asigna una nacion a cada jugador
        if (!iniciado){
            var nacionesDisponibles = [1, 35, 5, 31, 18]
            players().forEach(player => {
                var nationToUse = nacionesDisponibles.shift();
                gameApiclient.changeColor("nation" + nationToUse, player.color).then(() => {
                    document.querySelector("#nation" + nationToUse).style.backgroundColor = player.color; 
                    stompClient.send("/topic/nations", {}, JSON.stringify("cambio de color"));
                }).catch(error => console.log("No se pudo cambiar color de la nacion " + nationToUse));
                gameApiclient.addNation(player.nickname, "nation" + nationToUse).then(()=>{
                    self.nacionesConquistadas(gameApiclient.getNationsByNickname(player.nickname).length);
                }).catch(error => console.log("No se pudo agregar la nacion " + nationToUse));
                gameApiclient.setLeader("nation" + nationToUse,player.nickname).then(() =>{})
            });
            self.iniciado = true;
            localStorage.iniciado = JSON.stringify(self.iniciado);
        }
    },

    //Alerta con input que se crea al querer atacar una nacion
    self.formNations = function(currentNation){
        var nacion = gameApiclient.getNationById(currentNation);
        if(nacion.bloqueada === false){
            if (nacion.soldados < self.soldadosDisponibles()){
                gameApiclient.changeBlock(nacion,true).then(() =>{
                    nacion = gameApiclient.getNationById(currentNation);
                    // console.log(gameApiclient.getNationById(currentNation).bloqueada);
                    if (gameApiclient.getNationById(currentNation).bloqueada){
                        swal("Atacar " + currentNation, "Los soldados necesarios para atacar esta nacion son 'numero'.", {
                            content: {
                                element: "input",
                                attributes:{
                                    placeholder: "Numero de soldados que atacaran",
                                    type: "number",
                                    min: nacion.soldados + 1
                                },
                            },
                            buttons: ["Retirada", "Atacar"],
                            className : "nation-alert"
                        }).then((value) => {
                            if (value == null){}
                            else if (value != ""){
                                gameApiclient.substractSoldiers(self.currentPlayer.nickname, value, "disponibles").then(() => {
                                    // var nationAtacked = gameApiclient.getNationById(currentNation);
                                    gameApiclient.substractSoldiers(self.currentPlayer.nickname, nacion.soldados, "totales").then(() => {
                                        // console.log("Se resto " + nacion.soldados + " soldados a totales de " + nationAtacked.leader);
                                    }).catch(error => console.log("No se pudo restar soldados al lider anterior"));
                                    if(nacion.leader){
                                        gameApiclient.substractSoldiers(nacion.leader, nacion.soldados, "totales").then(() => {
                                            console.log("Se resto " + nacion.soldados + " soldados a totales de " + nationAtacked.leader);
                                        }).catch(error => console.log("No se pudo restar soldados al lider anterior"));
                                    }
                                    self.actualizeLocalTable(gameApiclient.getSoldiers(self.currentPlayer.nickname)[0], gameApiclient.getSoldiers(self.currentPlayer.nickname)[1]);
                                    stompClient.send("/topic/soldiers", {}, JSON.stringify("se restaron" + value));
                                    gameApiclient.setSoldiers(currentNation, value - nacion.soldados).then(() => {
                                        stompClient.send("/topic/nations", {}, JSON.stringify("actualizo naciones"));
                                    })
                                    atacarNacion(currentNation);
                                });
                            } else {
                                swal(`Por favor, agregue el numero de soldados con el que va a atacar.`, {
                                    className: "nation-alert"
                                });
                            }
                            gameApiclient.changeBlock(nacion,false).then(() => {
                                console.log("desbloqueada")
                            });
                            })
                        }else {
                            swal("Esta nación ya esta siendo conquistada",{
                                icon: "error",
                                className : "nation-alert"
                              });
                        }
            })} else {
                swal("No tienes suficientes soldados para conquistar esta nacion",{
                    icon: "error",
                    className : "nation-alert"
                  });}
        } else {
            swal("Esta nación ya esta siendo conquistada",{
                icon: "error",
                className : "nation-alert"
              });}
    }



    self.setNextPower = function(){
        var copyPlayers = self.players();
        for(let i = 0; i < copyPlayers.length; i++){
            if(copyPlayers[i].nickname == self.currentPlayer.nickname){
                copyPlayers.splice(i,1);
                break;
            }
        }
        copyPlayers.push(self.currentPlayer);
        var nicknames = [];
        for(let i = 0; i <copyPlayers.length; i++){
            nicknames[i] = copyPlayers[i].nickname;
        }
        gameApiclient.activatePower(nicknames);
        console.log(self.activePower);
    },

    self.runPower = function(){
        stompClient.send("/topic/power", {}, JSON.stringify("Se activo el poder"));
        self.setNextPower();
    },


    //Cambia el icono del poder que se va a desplegar
    self.changePower = function(){
        activarAlerta();
        self.activePower = gameApiclient.getActivePower();
        self.iconImage(powerIcons[self.activePower]);
        //Cambio la posicion del poder a una posicion random
        var xPosition = Math.floor(Math.random() * 50);
        var yPosition = Math.floor(Math.random() * 50);
        var currentPower = document.getElementById("power");
        currentPower.style.left = xPosition + "vw";
        currentPower.style.top = yPosition + "vh";

        //Se hace invisible el icono del poder por un tiempo definido
        currentPower.style.visibility = "hidden";
        setTimeout(() => {
            currentPower.style.visibility = "visible";
        }, 10)//60000
    },
    //Alerta sobre el poder que se ha activado
    self.activarAlerta = function(){
        swal("Se ha utilizado un poder!", "'Jugador' ha activado " + activePower.toUpperCase(), "warning", {
            button : false,
            className : "power-alert"
        });
    },
    
    self.connectAndSubscribe = function(){
        console.info('Connecting to WS...');
        var socket = new SockJS('/stompendstart');
        stompClient = Stomp.over(socket);
        
        //subscribe to /topic/TOPICXX when connections succeed
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/soldiers', function () {
                actualizeTable();
            });
            stompClient.subscribe('/topic/nations', function () {
                actualizeMap();
            });
            stompClient.subscribe('/topic/power', function () {
                changePower();
            });
            stompClient.subscribe('/topic/pause', function(){
                pauseEveryGame();
            })
            stompClient.subscribe('/topic/gameOver', function(){
                gameOver();
            })
        });
    }

    self.pauseGame = function(){
        stompClient.send("/topic/pause", {}, JSON.stringify("juego pausado por admin"));
    }

    self.finishGame = function(){
        stompClient.send("/topic/gameOver", {}, JSON.stringify("juego terminado por admin"));
    }

    self.pauseEveryGame = function(){
        swal("El admin ha pausado la partida", "Por favor esperar que el admin reanude la partida ", "warning", {
            button : false,
            className : "power-alert",
            closeOnClickOutside: false
        });
    }

    self.actualizeTable = function(){
        self.players(JSON.parse($.ajax({type:'GET', url:'../player', async:false}).responseText).slice(0,5));
    }

    self.actualizeMap = function(){
        var nations = JSON.parse($.ajax({type:'GET', url:'../nation', async:false}).responseText);
        for (i = 0; i < 35; i++){
            var nacion = document.querySelector("#nation" + (i +1));
            nacion.style.backgroundColor = nations[i].color; 
            nacion.firstChild.textContent = nations[i].soldados;
        }
        var winner = gameApiclient.getWinner();
        console.log(winner);
        if(winner!="none"){
            self.gameOver();
        }
    }

    self.gameOver = function(){
        gameApiclient.deletePlayers().then(() => {
            location.href = location.href.slice(0,-15) + "/html/gameover.html";
        }).catch(error => console.log("No se pudo terminar el juego"));
        

    }

    self.actualizeLocalTable = function(disponibles, totales){
        self.soldadosDisponibles(disponibles);
        self.soldadosTotal(totales);
    }

    connect = (function(){
        self.connectAndSubscribe();
        self.añadirNacionesMapa();
        self.actualizeMap();
    })();

    return{
        changePower:changePower
    }
});
ko.applyBindings(game());