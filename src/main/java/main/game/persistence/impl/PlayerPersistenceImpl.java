package main.game.persistence.impl;

import java.util.ArrayList;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import main.game.model.Player;
import main.game.persistence.PlayerPersistence;

@Component
public class PlayerPersistenceImpl implements PlayerPersistence{

    private String[] colors = {"red", "blue", "green", "purple", "yellow"};

    private ArrayList<Player> players = new ArrayList<Player>();
    
    @Override
    public void addPlayer(Player player){
        this.players.add(player);
    }

    @Override
    public void addSoldier(Player player){
        synchronized(player){
            player.addOneSol();
        }
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
    public Set<String> getNacionesPlayer(Player player) {
        return player.getNaciones();
    }

    @Override
    public void substractSoldiers(String nickname, int subsoldiers, String tipo) {
        Player player = getPlayer(nickname);
        synchronized(player){
            if(tipo.equals("totales")){
                player.setSoldadosTotales(player.getSoldadosTotales() - subsoldiers);
            }else{
                player.setSoldadosDisponibles(player.getSoldadosDisponibles() - subsoldiers);       
            }
        }
    }

    @Override
    public void addNacion(String idNation, String nickname) {
        Player player = getPlayer(nickname);
        player.addNacion(idNation);
    }

	@Override
	public void removeNation(String idNation, String nickname) {
		Player player = getPlayer(nickname);
        player.deleteNation(idNation);
	}

    @Override
    public void deleteAll(){
        players = new ArrayList<Player>();
    }

}