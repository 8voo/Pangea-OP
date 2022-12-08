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
        Nation nation = nationRepository.findById(id).get();
        return nation;
    }

    public void changeBlockNation(String idNation){
        Nation nation = nationRepository.findById(idNation).get();
        synchronized(nation){
            nation.changeBloqueado();
            nationRepository.save(nation);
        }
    }

    public void setSoldiers(String nationID, int newSoldiers){
        Nation nation = nationRepository.findById(nationID).get();
        nation.setSoldados(newSoldiers);
        nationRepository.save(nation);
    }

    public void deleteAll(){
        nationRepository.deleteAll();
    }
}