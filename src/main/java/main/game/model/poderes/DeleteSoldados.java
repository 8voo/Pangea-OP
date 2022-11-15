package main.game.model.poderes;

import java.util.ArrayList;

import main.game.model.Poder;

public class DeleteSoldados implements Poder {
    private String name = "DeleteSoldados";
    private boolean active;
    private ArrayList<String> activePowerPlayers;

    @Override
    public void activatePower(String player) {
    }

    @Override
    public boolean isActive() {
        return active;
    }

    @Override
    public String getName() {
        return this.name;
    }

    @Override
    public void deactivatePower() {
        this.activePowerPlayers = new ArrayList<String>();
        this.active = false;
    }

    @Override
    public void activatePower(ArrayList<String> players) {    
        this.activePowerPlayers = players;
        this.active = true;    
    }
    
}
