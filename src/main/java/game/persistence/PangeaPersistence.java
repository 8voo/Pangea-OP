package game.persistence;

import java.util.ArrayList;

import game.model.Player;

public interface PangeaPersistence {

    public void addPlayer(Player player);
        
    public void addSoldier(Player player);

    public ArrayList<Player> getAllPlayers();

    public boolean allReady();
}
