package game.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import game.model.Player;
import game.persistence.PangeaPersistence;

@Service
public class PangeaServices {
    @Autowired 
    private PangeaPersistence pp = null;

    public void setPangeaPersistence(PangeaPersistence pp){
        this.pp = pp;
    }

    public void addNewPlayer(Player player){
        pp.addPlayer(player);
    }

    public void addOneSol(Player player){
        pp.addSoldier(player);
    }
}
