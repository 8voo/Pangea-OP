package main.game.persistence.impl;

import java.util.ArrayList;

import org.springframework.stereotype.Component;

import main.game.model.Nation;
import main.game.model.Player;
import main.game.persistence.NationsPersistence;
import main.game.persistence.PangeaPersistence;

@Component
public class NationsPersistenceImpl implements NationsPersistence{

    private ArrayList<Nation> naciones = new ArrayList<Nation>();

    @Override
    public ArrayList<Nation> getAllNations(){
        if(naciones.size() <= 0){
            for (int i = 1; i <= 35; i++){
                naciones.add(new Nation("nation" + i)) ;
            }
        }
        return naciones;
    }
    
    @Override
    public void changeColor(String id, String color){
        for(Nation n:naciones){
            if(n.getId().equals(id)){
                n.setColor(color);
            }
        }
    }

    @Override
    public void changeBlockNation(Nation nation) {
        nation.setBloqueado(true);
        
    }

}