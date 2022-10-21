package main.game.persistence.impl;

import java.util.ArrayList;

import org.springframework.stereotype.Component;

import main.game.model.Player;
import main.game.persistence.PangeaPersistence;

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
    public Player getPlayer(String nickname){
        for(Player p :players){
            if(p.getNickname().equals(nickname)){
                System.out.println("Entro");
                return p;
            }
        }
        return null;
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