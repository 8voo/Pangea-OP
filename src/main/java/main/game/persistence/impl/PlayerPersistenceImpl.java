package main.game.persistence.impl;

import java.util.ArrayList;

import org.springframework.stereotype.Component;

import main.game.model.Nation;
import main.game.model.Player;
import main.game.persistence.PangeaPersistence;

@Component
public class PlayerPersistenceImpl implements PangeaPersistence{

    private String[] colors = {"red", "blue", "green", "purple", "yellow"};

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
        for(int i = 0; i < players.size(); i++){
            Player p = players.get(i);
            p.setColor(colors[i]);
            p.setId(players.indexOf(p));
        }

        return true;
    }

    @Override
    public ArrayList<Integer> getNacionesPlayer(Player player) {
        return player.getNaciones();
    }

    
}