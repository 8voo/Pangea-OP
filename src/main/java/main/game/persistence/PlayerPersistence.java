package main.game.persistence;

import java.util.ArrayList;
import java.util.Set;

import main.game.model.Player;

public interface PlayerPersistence {

    public void addPlayer(Player player);
        
    public void addSoldier(Player player);

    public void substractSoldiers(String nickname, int subsoldiers);
    
    public Set<String> getNacionesPlayer(Player player);

    public ArrayList<Player> getAllPlayers();
    
    public void addNacion(String idNation, String nickname);

    public boolean allReady();

    public Player getPlayer(String nickname);
}
