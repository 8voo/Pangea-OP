package main.game.model.poderes;

import java.util.ArrayList;

import main.game.model.Player;
import main.game.model.Poder;

public class Freeze extends Poder{

    public Freeze(){
        super("Freeze");
    }

    public void activatePower(ArrayList<String> players) {    
        super.activePowerPlayers = players;
        super.active = true;    
    }
    
}
