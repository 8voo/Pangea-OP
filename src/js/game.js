var powerIcons = ["../../img/click.png", "../../img/soldado.png", "../../img/winter.png"]

var game = function(){
    var self = this;
    self.clickSum = 1;
    self.soldadosDisponibles = ko.observable(0);
    self.soldadosTotal = ko.observable(0);
    self.nacionesConquistadas = ko.observable(0);
    self.iconImage = ko.observable("../../img/click.png");

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
        self.iconImage(powerIcons[Math.floor(Math.random() * powerIcons.length)]);
        
        //Cambio la posicion del poder a una posicion random
        var xPosition = Math.floor(Math.random() * 100);
        var yPosition = Math.floor(Math.random() * 100);
        var currentPower = document.getElementById("power");
        currentPower.style.left = xPosition + "%";
        currentPower.style.top = yPosition + "%";

        activarPoder()

        //Se hace invisible el icono del poder por un tiempo definido
        currentPower.style.visibility = "hidden";
        setTimeout(() => {
            currentPower.style.visibility = "visible";
        }, 60000)
    }

    //Alerta de que se ha activado un poder
    var activarPoder = function(){
        swal("Se ha utilizado un poder!", "'Jugador' ha activado 'Poder'", "warning", {
            button : false,
            className : "power-alert"
        });
    }
}

ko.applyBindings(game());