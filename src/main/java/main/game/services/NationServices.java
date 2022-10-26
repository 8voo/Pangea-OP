package main.game.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import main.game.model.Nation;
import main.game.persistence.NationsPersistence;

@Service
public class NationServices {
    @Autowired 
    private NationsPersistence np = null;

    public Nation getNationById(String id){
        return np.getNationById(id);
    }

    public ArrayList<Nation> getAllNations(){
        return np.getAllNations();
    }

    public void changeBlockNation(String idNation){
        Nation nation = np.getNationById(idNation);
        synchronized(nation){
            np.changeBlockNation(nation);
        }
    }

    public void changeColor(String id, String color){
        np.changeColor(id, color);
    }

    public void setSoldiers(String nationID, int newSoldiers){
        np.setSoldados(np.getNationById(nationID), newSoldiers);
    }
    
    public void setLeader(String nation, String nickname){
        np.setLeader(nation, nickname);
    }
}