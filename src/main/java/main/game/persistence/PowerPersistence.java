package main.game.persistence;

import java.util.ArrayList;

public interface PowerPersistence {

    public void activatePower(ArrayList<String> players);
    
    public String getActivePower();

    public void deactivatePower();

    public ArrayList<String> getActivePlayers();

}
