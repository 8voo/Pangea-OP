package main.game.persistence.impl;

import java.util.ArrayList;

import org.springframework.stereotype.Component;

import main.game.model.Poder;
import main.game.model.poderes.DeleteSoldados;
import main.game.model.poderes.Freeze;
import main.game.model.poderes.TripleClick;
import main.game.persistence.PowerPersistence;

@Component
public class PowerPersistenceimpl implements PowerPersistence{
    private Poder[] poderes = {new TripleClick(), new Freeze(), new DeleteSoldados()};

    public Poder getActivePower(){
        for (Poder poder : poderes){
            if (poder.isActive());
            return poder;
        }
        return null;
    }


}
