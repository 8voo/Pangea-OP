var powerIcons = {
    tripleClick : "../img/click.png", 
    quitaSoldados : "../img/soldado.png", 
    congelar : "../img/winter.png"
}

var game = (function(){
    var self = this;
    self.nickname = ko.observable(JSON.parse(localStorage.nickname));
    self.iniciado = JSON.parse(localStorage.iniciado);
    self.currentPlayer = JSON.parse($.ajax({type:'GET', url:'../player/' + self.nickname(), async:false}).responseText);
    self.currentColor = self.currentPlayer.color;
    self.clickSum = 1;
    self.soldadosDisponibles = ko.observable(0);
    self.soldadosTotal = ko.observable(0);
    self.nacionesConquistadas = ko.observable(0);
    self.iconImage = ko.observable(powerIcons["congelar"]);
    self.activePower = "congelar";
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
                                    self.soldadosDisponibles(gameApiclient.getSoldiers(self.currentPlayer.nickname)[0]);
                                    self.soldadosTotal(gameApiclient.getSoldiers(self.currentPlayer.nickname)[1]);
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

    self.atacarNacion = function(currentNation){
        gameApiclient.changeColor(currentNation, self.currentColor).then(() => {
            document.querySelector("#" + currentNation).style.backgroundColor = self.currentColor; 
            stompClient.send("/topic/nations", {}, JSON.stringify("cambio de color"));   
        }).catch(error => console.log("No se pudo cambiar color de la nacion " + currentNation));

        gameApiclient.addNation(self.currentPlayer.nickname, currentNation).then(()=>{
            self.nacionesConquistadas(gameApiclient.getNationsByNickname(self.currentPlayer.nickname).length);
        }).catch(error => console.log("No se añadio la nacion" + currentNation));
        
        let nacion = gameApiclient.getNationById(currentNation);
        gameApiclient.deleteNation(nacion, nacion.leader).then(() =>{            
        }).catch(error => console.log("No se pudo eliminar la nacion " + currentNation));

        gameApiclient.setLeader(currentNation, self.currentPlayer.nickname).then(() => {
            // console.log("Se seteo como lider a" + self.currentPlayer.nickname + "a ls nacion" + currentNation)
        }).catch(error => console.log("No se pudo setear como lider a " + self.currentPlayer.nickname));
    },

    //Con cada click al boton de crear, suma la cantidad de soldados
    //predeterminados a la cantidad de soldados disponibles del usuario
    self.addDisponibles = function(){
        gameApiclient.addSoldier(self.nickname(), self.clickSum).then(() => {
            self.soldadosDisponibles(gameApiclient.getSoldiers(self.nickname())[0]);
            self.soldadosTotal(gameApiclient.getSoldiers(self.nickname())[1]);
            stompClient.send("/topic/soldiers", {}, JSON.stringify("añadio soldados stomp"));
            // console.log("Soldado añadido");
        }).catch(error => console.log("No se pudo añadir el soldado"));
    },

    //Cambia el icono del poder que se va a desplegar
    self.changePower = function(){
        activarAlerta();

        var powerNames = Object.keys(powerIcons);
        self.activePower = powerNames[Math.floor(Math.random() * powerNames.length)];
        self.iconImage(powerIcons[activePower]);
        
        //Cambio la posicion del poder a una posicion random
        var xPosition = Math.floor(Math.random() * 100);
        var yPosition = Math.floor(Math.random() * 100);
        var currentPower = document.getElementById("power");
        currentPower.style.left = xPosition + "%";
        currentPower.style.top = yPosition + "%";

        //Se hace invisible el icono del poder por un tiempo definido
        currentPower.style.visibility = "hidden";
        setTimeout(() => {
            currentPower.style.visibility = "visible";
        }, 60)//60000
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
                // actualizeMap();
            });
            stompClient.subscribe('/topic/nations', function () {
            
                actualizeMap();
            });
        });
    },

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
    }

    // self.actualizeLocalTable = function(disponibles, totales){
    //     self.soldadosDisponibles(gameApiclient.getSoldiers(disponibles);
    //     self.soldadosTotal(gameApiclient.getSoldiers(self.currentPlayer.nickname)[1]);
    // }
    
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