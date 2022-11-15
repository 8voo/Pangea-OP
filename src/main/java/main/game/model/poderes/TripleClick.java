package main.game.model.poderes;

import java.util.ArrayList;

import main.game.model.Player;
import main.game.model.Poder;

public class TripleClick implements Poder {
    private boolean active;
    private String name = "TripleClick";
    private String[] activePowerPlayers;
    private String singlePlayer;

    @Override
    public void activatePower(String player) {
        this.singlePlayer = player;
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
        this.activePowerPlayers = new String[] {};
        this.active = false;
    }

    @Override
    public void activatePower(ArrayList<String> players) {
    }   
}
