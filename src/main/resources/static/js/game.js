var powerIcons = {
    TripleClick : "../img/click.png", 
    DeleteSoldados : "../img/soldado.png", 
    Freeze : "../img/winter.png"
}

var game = (function(){
    var self = this;
    self.nickname = ko.observable(JSON.parse(localStorage.nickname));
    self.iniciado = JSON.parse(localStorage.iniciado);
    self.currentPlayer = JSON.parse($.ajax({type:'GET', url:'../player/' + self.nickname(), async:false}).responseText);
    self.currentColor = self.currentPlayer.color;
    self.clickSum = 1;
    self.soldadosDisponibles = ko.observable(0);
    self.soldadosTotal = ko.observable(10);
    self.nacionesConquistadas = ko.observable(1);
    self.iconImage = ko.observable(powerIcons["TripleClick"]);
    self.activePower = "TripleClick";
    self.players = ko.observable(gameApiclient.getPlayers());
    
    //Añade las naciones al mapa y asigna una nacion de inicio a cada jugador
    self.añadirNacionesMapa = function(){
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
            self.players().forEach(player => {
                console.log("player " + player + "Player color " + player.color);

                var nationToUse = nacionesDisponibles.shift();
                gameApiclient.addNation(player.nickname, "nation" + nationToUse).then(()=>{
                    self.nacionesConquistadas(gameApiclient.getNationsByNickname(player.nickname).length);
                    stompClient.send("/topic/nations", {}, JSON.stringify("cambio de color"));
                }).catch(error => console.log("No se pudo agregar la nacion " + nationToUse));

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
                            else if (value > nacion.soldados){
                                gameApiclient.substractSoldiers(self.currentPlayer.nickname, value, "disponibles").then(() => {
                                    var nationAtacked = gameApiclient.getNationById(currentNation);
                                    gameApiclient.substractSoldiers(self.currentPlayer.nickname, nacion.soldados, "totales").then(() => {
                                        // console.log("Se resto " + nacion.soldados + " soldados a totales de " + nationAtacked.leader);
                                    }).catch(error => console.log("No se pudo restar soldados al lider anterior"));
                                    if(nacion.leader){
                                        gameApiclient.substractSoldiers(nacion.leader, nacion.soldados, "totales").then(() => {
                                            console.log("Se resto " + nacion.soldados + " soldados a totales de " + nationAtacked.leader);
                                        })//.catch(error => console.log("No se pudo restar soldados al lider anterior"));
                                    }
                                    self.actualizeLocalTable(gameApiclient.getSoldiers(self.currentPlayer.nickname)[0], gameApiclient.getSoldiers(self.currentPlayer.nickname)[1]);
                                    stompClient.send("/topic/soldiers", {}, JSON.stringify("se restaron" + value));
                                    gameApiclient.setSoldiers(currentNation, value - nacion.soldados).then(() => {
                                        stompClient.send("/topic/nations", {}, JSON.stringify("actualizo naciones"));
                                    })
                                    atacarNacion(currentNation);
                                });
                            } else if (value != "") {
                                swal(`Por favor, ingrese un numero de soldados valido.`, {
                                    className: "nation-alert"
                                });
                            } 
                            else {
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

    self.atacarNacion = function(currentNation){
        var nacion = gameApiclient.getNationById(currentNation);
        console.log(nacion.id);
        playerList = gameApiclient.getPlayers();
        playerList.forEach(player => {
            naciones = player.naciones;
            naciones.forEach(nation => {
                if(nation == nacion.id){
                    console.log(nacion.id)
                    lider = player.nickname;
                    gameApiclient.deleteNation(nacion.id, lider).then(() =>{        
            
                    })
                }
            });
        });

        gameApiclient.addNation(self.currentPlayer.nickname, currentNation).then(()=>{
            self.nacionesConquistadas(gameApiclient.getNationsByNickname(self.currentPlayer.nickname).length);
        }).catch(error => console.log("No se añadio la nacion" + currentNation));
        
        
        //.catch(error => console.log("No se pudo eliminar la nacion " + currentNation));

        
    },


    //Con cada click al boton de crear, suma la cantidad de soldados
    //predeterminados a la cantidad de soldados disponibles del usuario
    self.addDisponibles = function(){
        gameApiclient.addSoldier(self.nickname(), self.clickSum).then(() => {
            self.actualizeLocalTable(gameApiclient.getSoldiers(self.nickname())[0], gameApiclient.getSoldiers(self.nickname())[1]);
            stompClient.send("/topic/soldiers", {}, JSON.stringify("añadio soldados stomp"));
            // console.log("Soldado añadido");
        }).catch(error => console.log("No se pudo añadir el soldado"));
    },


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
        // gameApiclient.getPlayers().then((resolve) => {
        //     self.players(resolve)
        //     self.players().forEach(player => {
        //         nationsToPaint = player.nations
        //         nationsToPaint.forEach(nation => {
        //             nationId = document.querySelector("#" + nation.id);
        //             nationId.style.backgroundColor = player.color;
        //         });
        //     });
        //     if (gameApiclient.getWinner() != "none" && gameApiclient.getWinner() != ""){
        //         self.gameOver();
        //     }
        // });
        
        // self.nations(JSON.parse(gameApiclient.getNations())).then((resolve) => {
        //     nations().forEach(nation => {
        //         nationId = document.querySelector("#" + nation.id);
        //         nationId.firstChild.textContent = nation.soldados;
        //     });
        // });

        
        self.players(gameApiclient.getPlayers())
        self.players().forEach(player => {
            nationsToPaint = player.naciones
            nationsToPaint.forEach(nation => {
                nationId = document.querySelector("#" + nation);
                nationId.style.backgroundColor = player.color;
            });
        });
        if (gameApiclient.getWinner() != "none" && gameApiclient.getWinner() != ""){
            self.gameOver();
        }
        
        gameApiclient.getNations().then((nations) => {
            nations = JSON.parse(nations)
            nations.forEach(nation => {
                nationId = document.querySelector("#" + nation.id);
                nationId.firstChild.textContent = nation.soldados;
            });
        });

    }

    self.gameOver = function(){
        location.href = location.href.slice(0,-15) + "/html/gameover.html";
            localStorage.nickname = JSON.stringify("");
            localStorage.iniciado = JSON.stringify(false);
        gameApiclient.deletePlayers().then(() => {
            
        }).catch(error => console.log("No se pudo terminar el juego"));
        gameApiclient.deleteAllNation().then(() => {
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
        addDisponibles:addDisponibles,
        changePower:changePower
    }
});
ko.applyBindings(game());