package main.game.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
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

    // public Nation getNationById(String id){
    //     return np.getNationById(id);
    // }

    // public ArrayList<Nation> getAllNations(){
    //     return np.getAllNations();
    // }

    // public void changeBlockNation(String idNation){
    //     Nation nation = np.getNationById(idNation);
    //     synchronized(nation){
    //         np.changeBlockNation(nation);
    //     }
    // }

    // public void changeColor(String id, String color){
    //     np.changeColor(id, color);
    // }

    // public void setSoldiers(String nationID, int newSoldiers){
    //     np.setSoldados(np.getNationById(nationID), newSoldiers);
    // }
    
    // public void setLeader(String nation, String nickname){
    //     np.setLeader(nation, nickname);
    // }

    // public String allConquered(){
    //     return np.allConquered();
    // }

    // public void deleteAll(){
    //     np.deleteAll();
    // }
}