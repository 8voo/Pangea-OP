package main.game.model.poderes;

import java.util.ArrayList;

import main.game.model.Player;
import main.game.model.Poder;

public class TripleClick extends Poder {
    public TripleClick(){
        super("TripleClick");
    }

    public void activatePower(String player) {
        super.activePowerPlayers.add(player);
        super.active = "TripleClick";
    }
}
