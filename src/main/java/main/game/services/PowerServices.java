package main.game.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import main.game.model.Poder;
import main.game.persistence.PowerPersistence;

@Service
public class PowerServices {
    @Autowired
    PowerPersistence pp = null;

    public String getActivePower(){
        return pp.getActivePower();
    }

    public void activatePower(String[] players){
        ArrayList<String> playersAL = new ArrayList<String>();
        for (String player : players){
            playersAL.add(player);
        }
        pp.activatePower(playersAL);
    }

    public void deactivatePower(){
        pp.deactivatePower();
    }

    public ArrayList<String> getActivePlayers(){
        return pp.getActivePlayers();
    }
}
