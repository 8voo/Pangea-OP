package game.persistence.impl;

import java.util.ArrayList;

import game.model.Player;
import game.persistence.PangeaPersistence;

import org.springframework.stereotype.Component;

@Component
public class PangeaPersistenceImpl implements PangeaPersistence{

    private ArrayList<Player> players = new ArrayList<Player>();


    @Override
    public void addPlayer(Player player){
        this.players.add(player);
    }

    @Override
    public void addSoldier(Player player){
        player.addOneSol();
    }

    @Override
    public ArrayList<Player> getAllPlayers(){
        return players;
    }

    @Override
    public boolean allReady() {
        for(Player p: players){
            if(p.isListo() == false){
                return false;
            }
        }
        for(Player p: players){
            p.setId(players.indexOf(p));
        }

        return true;
    }

    
}