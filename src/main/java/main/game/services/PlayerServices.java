package main.game.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.stereotype.Service;

import main.game.model.Player;
import main.game.persistence.PlayerPersistence;
import main.game.repositories.PlayerRepository;


@EnableMongoRepositories(basePackageClasses = PlayerRepository.class)
@Service
public class PlayerServices {

    @Autowired
    PlayerRepository playerRepository;

    private String[] colors = {"red", "blue", "green", "purple", "yellow"};
    
    public void addPlayer(Player player){
        playerRepository.save(player);
    }

    public void addSoldier(Player player){
        synchronized(player){
            player.addOneSol();
        }
    }

    public List<Player> getAllPlayers(){
        return playerRepository.findAll();
    }

    public Player getPlayer(String nickname){
        for(Player p : playerRepository.findAll()){
            if(p.getNickname().equals(nickname)){
                return p;
            }
        }
        return null;
    }

    public boolean allReady() {
        for(Player p: playerRepository.findAll()){
            if(p.isListo() == false){
                return false;
            }
        }
        for(int i = 0; i < playerRepository.findAll().size(); i++){
            Player p = playerRepository.findAll().get(i);
            p.setColor(colors[i]);
            p.setId(playerRepository.findAll().indexOf(p));
        }

        return true;
    }

    public Set<String> getNacionesPlayer(Player player) {
        return player.getNaciones();
    }

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

    public void addNacion(String idNation, String nickname) {
        Player player = getPlayer(nickname);
        player.addNacion(idNation);
    }

	public void removeNation(String idNation, String nickname) {
		Player player = getPlayer(nickname);
        player.deleteNation(idNation);
	}

    public void deleteAll(){
        playerRepository.deleteAll();
    }
}
