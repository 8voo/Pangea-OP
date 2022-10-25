package main.game.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import main.game.model.Nation;
import main.game.persistence.NationsPersistence;

@Service
public class NationServices {
    @Autowired 
    private NationsPersistence np = null;


    public ArrayList<Nation> getAllNations(){
        return np.getAllNations();
    }

    public void changeColor(String id, String color){
        np.changeColor(id, color);
    }
}