package main.game.services;

import java.util.ArrayList;
import java.util.Set;

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
    
    public void substractSoldiers(String nickname, int subsoldiers){
        pp.substractSoldiers(nickname, subsoldiers);
    }

    public Set<String> getNations(Player player){
        return pp.getNacionesPlayer(player);
    }

    public void addNacion(String idNacion, String nickname){
        pp.addNacion(idNacion, nickname);
    }
    
}
