var game = function(){
    var self = this;
    self.clickSum = 1;
    self.soldadosDisponibles = ko.observable(0);
    self.soldadosTotal = ko.observable(0);
    self.nacionesConquistadas = ko.observable(0);

    self.addDisponibles = function(){
        var currentDisponible = self.soldadosDisponibles();
        self.soldadosDisponibles(currentDisponible + clickSum);
        var currentTotal = self.soldadosTotal();
        self.soldadosTotal(currentTotal + clickSum);
    }
    var activarPoder = function(){
        swal("Se ha utilizado un poder!", "'Jugador' ha activado 'Poder'", "warning", {
            button : false,
            className : "power-alert"
        });
    }
}

ko.applyBindings(game());