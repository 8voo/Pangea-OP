package main.game.model.poderes;

import java.util.ArrayList;

import main.game.model.Poder;

public class DeleteSoldados extends Poder {

    public DeleteSoldados(){
        super("DeleteSoldados");
    }

    public void activatePower(ArrayList<String> players) {    
        super.activePowerPlayers = players;
        super.active = true;
    }
    
}
