package main.game.persistence.impl;

import java.util.ArrayList;

import org.springframework.stereotype.Component;

import main.game.model.Nation;
import main.game.persistence.NationsPersistence;

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
    public Nation getNationById(String id){
        for(Nation n:naciones){
            if(n.getId().equals(id)){
                return n;
            }
        }
        return null;
    }

    @Override
    public void changeBlockNation(Nation nation) {
        nation.changeBloqueado();
    }

    @Override
    public void setSoldados(Nation nation, int newSoldiers){
        nation.setSoldados(newSoldiers);
    }

    @Override
    public void setLeader(String nation, String nickname) {
        for(Nation n:naciones){
            if(n.getId().equals(nation)){
                n.setleader(nickname);;
            }
        }
    }

    @Override
    public String allConquered(){
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

    @Override
    public void deleteAll(){
        naciones = new ArrayList<Nation>();
    }
}