package game.persistence.impl;


import java.util.ArrayList;

import game.model.Player;
import game.persistence.PangeaPersistence;
import game.persistence.impl.threads.PlayerThread;

import org.springframework.stereotype.Component;

@Component
public class PangeaPersistenceImpl implements PangeaPersistence{

    private ArrayList<Player> players = new ArrayList<Player>();
    private ArrayList<PlayerThread> playerTreads = new ArrayList<PlayerThread>();

    public void addPlayer(Player player){
        this.players.add(player);
    }

    public void addSoldier(Player player){
        player.addOneSol();
    }
    
    public void playersThreats(){
        for (Player p : players){
            PlayerThread newThread = new PlayerThread(p);
            newThread.start();
            playerTreads.add(newThread);
        }
    }

}