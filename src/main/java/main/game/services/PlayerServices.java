package main.game.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import main.game.model.Player;
import main.game.persistence.PlayerPersistence;

@Service
public class PlayerServices {
    @Autowired 
    private PlayerPersistence pp = null;

    public void setPangeaPersistence(PlayerPersistence pp){
        this.pp = pp;
    }
    
    public boolean allReady(){
        return pp.allReady();
    }

    public void addNewPlayer(Player player){
        pp.addPlayer(player);
    }

    public void addOneSol(Player player){
        pp.addSoldier(player);
    }

    public ArrayList<Player> getAllPlayers(){
        return pp.getAllPlayers();
    }

    public Player getPlayer(String nickname){
        return pp.getPlayer(nickname);
    }

    public ArrayList<Integer> getNations(Player player){
        return pp.getNacionesPlayer(player);
    }
    
}
