package main.game.model.poderes;

import main.game.model.Player;
import main.game.model.Poder;

public class TripleClick implements Poder {
    private boolean active;
    private String name;

    @Override
    public void activatePower(Player player) {
        this.active = true;
    }

    @Override
    public boolean isActive() {
        return active;
    }

    @Override
    public String getName() {
        return this.name;
    }
    
    
}
