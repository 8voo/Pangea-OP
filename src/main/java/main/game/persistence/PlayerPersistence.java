package main.game.persistence;

import java.util.ArrayList;

import main.game.model.Player;

public interface PlayerPersistence {

    public void addPlayer(Player player);
        
    public void addSoldier(Player player);

    
    
    public ArrayList<Integer> getNacionesPlayer(Player player);

    public ArrayList<Player> getAllPlayers();
    

    public boolean allReady();

    public Player getPlayer(String nickname);
}
