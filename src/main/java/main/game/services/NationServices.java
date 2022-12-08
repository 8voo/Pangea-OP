package main.game.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.stereotype.Service;

import main.game.model.Nation;
import main.game.repositories.NationRepository;

@EnableMongoRepositories(basePackageClasses = NationRepository.class)
@Service
public class NationServices {

    @Autowired
    NationRepository nationRepository;


    public List<Nation> getAllNations(){
        List<Nation> naciones = nationRepository.findAll();
        if(naciones.size() <= 0){
            for (int i = 1; i <= 35; i++){
                nationRepository.save(new Nation("nation" + i));
            }
        }
        return nationRepository.findAll();
    }

    public Nation getNationById(String id){
        System.out.println(nationRepository.findById(id).get().toString());
        return nationRepository.findById(id).get();
    }

    public void changeBlockNation(String idNation){
        Nation nation = nationRepository.findById(idNation).get();
        synchronized(nation){
            nation.changeBloqueado();
            nationRepository.save(nation);
        }
    }

    public void changeColor(String id, String color){
        Nation nation = nationRepository.findById(id).get();
        nation.setColor(color);
        nationRepository.save(nation);
    }

    public void setSoldiers(String nationID, int newSoldiers){
        Nation nation = nationRepository.findById(nationID).get();
        nation.setSoldados(newSoldiers);
        nationRepository.save(nation);
    }
    
    public void setLeader(String nationId, String nickname){
        Nation nation = nationRepository.findById(nationId).get();
        nation.setColor(nickname);
        nationRepository.save(nation);
    }

    public String allConquered(){
        List<Nation> naciones = nationRepository.findAll();
        String lider = naciones.get(0).getleader();
        boolean isWinner = true;
        for(Nation n:naciones){
            if(!(n.getleader().equals(lider))){
                isWinner = false;
            }
        }
        if(isWinner){
            return lider;
        }
        return "none";
    }

    public void deleteAll(){
        nationRepository.deleteAll();
    }
}