var powerIcons = { 
    tripleClick : "../../img/click.png", 
    quitaSoldados : "../../img/soldado.png", 
    congelar : "../../img/winter.png"
}

var game = function(){
    var self = this;
    self.clickSum = 1;
    self.soldadosDisponibles = ko.observable(0);
    self.soldadosTotal = ko.observable(0);
    self.nacionesConquistadas = ko.observable(0);
    self.iconImage = ko.observable(powerIcons["congelar"]);
    self.activePower = "congelar";

    //Con cada click al boton de crear, suma la cantidad de soldados
    //predeterminados a la cantidad de soldados disponibles del usuario
    self.addDisponibles = function(){
        var currentDisponible = self.soldadosDisponibles();
        self.soldadosDisponibles(currentDisponible + clickSum);
        var currentTotal = self.soldadosTotal();
        self.soldadosTotal(currentTotal + clickSum);
    }

    //Cambia el icono del poder que se va a desplegar
    self.changePower = function(){
        activarPoder()

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
    }

    //Alerta sobre el poder que se ha activado
    var activarPoder = function(poder){
        swal("Se ha utilizado un poder!", "'Jugador' ha activado " + activePower.toUpperCase(), "warning", {
            button : false,
            className : "power-alert"
        });
    }
}

ko.applyBindings(game());