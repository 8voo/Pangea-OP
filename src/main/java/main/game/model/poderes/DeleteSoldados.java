package main.game.model.poderes;

import main.game.model.Player;
import main.game.model.Poder;

public class DeleteSoldados implements Poder {
    private String name;
    private boolean active;

    @Override
    public void activatePower(Player player) {
        
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
