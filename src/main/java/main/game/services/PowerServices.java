package main.game.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import main.game.model.Poder;
import main.game.persistence.PowerPersistence;

@Service
public class PowerServices {
    

    @Autowired
    PowerPersistence pp = null;

    public Poder getActivePower(){
        return pp.getActivePower();
    }
}
