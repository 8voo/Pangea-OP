var powerIcons = {
    tripleClick : "../img/click.png", 
    quitaSoldados : "../img/soldado.png", 
    congelar : "../img/winter.png"
}

var game = (function(){
    var self = this;
    self.nickname = ko.observable(JSON.parse(localStorage.nickname));
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
    self.añadirNacionesMapa = (function(){
        console.log("entro");
        var gameMap = $("#game-map");

        for (i = 1; i <= 35; i++){
            // gameMap.append('<div class="grid-item" id = "nation' + i + '" data-bind="text : nation' + i + '-needed"></div>');
            gameMap.append('<div class="grid-item" id = "nation' + i + '"></div>');
            var currentNation = "nation" + i;
            $("#" + currentNation).on("click", function(){
                self.formNations(currentNation);
            })();
        }

        //Asigna una nacion a cada jugador
        var nacionesDisponibles = [1, 35, 5, 31, 18]
        players().forEach(player => {
            var nationToUse = nacionesDisponibles.shift();
            document.querySelector("#nation" + nationToUse).style.backgroundColor = player.color;
        });
    })();

    //Alerta con input que se crea al querer atacar una nacion
    self.formNations = function(currentNation){
        swal("Atacar " + currentNation, "Los soldados necesarios para atacar esta nacion son 'numero'.", {
            content: "input",
            className : "nation-alert"
          })
          .then((value) => {
            // console.log(value)
            if (value != ""){
                atacarNacion(currentNation);
            } // else if lo que entra no es numero 
            else {
                swal(`Por favor, agregue el numero de soldados con el que va a atacar.`, {
                    className: "nation-alert"
                });
            }
        });
    }

    self.atacarNacion = function(currentNation){
        document.querySelector("#" + currentNation).style.backgroundColor = self.currentColor;
    }

    //Con cada click al boton de crear, suma la cantidad de soldados
    //predeterminados a la cantidad de soldados disponibles del usuario
    self.addDisponibles = function(){
        gameApiclient.addSoldier(self.nickname(), self.clickSum).then(() => {
            self.soldadosDisponibles(gameApiclient.getSoldiers(self.nickname())[0]);
            self.soldadosTotal(gameApiclient.getSoldiers(self.nickname())[1]);
            stompClient.send("/topic/soldiers", {}, JSON.stringify("añadio soldados stomp"));
            console.log("Soldado añadido");
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
            });
        });
    },

    self.actualizeTable = function(){
        console.log("actualicetable")
        self.players(JSON.parse($.ajax({type:'GET', url:'../player', async:false}).responseText).slice(0,5));
    }
    
    connect = (function(){
        console.log("entro connect")
        self.connectAndSubscribe();
    })();

    return{
        addDisponibles:addDisponibles,
        changePower:changePower
    }
});
ko.applyBindings(game());