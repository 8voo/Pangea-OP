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
    private int currPower;

    public String getActivePower(){
        for (Poder poder : poderes){
            if (poder.isActive()){
                return poder.getName();
            }
        }
        return null;
    }

    @Override
    public void activatePower(ArrayList<String> players) {
        this.currPower = (int)(Math.random() * poderes.length) - 1;
        if(getActivePower() == "TripleClick"){
            players.remove(players.size() - 1);
            poderes[currPower].activatePower(players);
        } else{
            String singlePlayer = players.get(players.size());
            poderes[currPower].activatePower(singlePlayer);
        }
    }

    @Override
    public void deactivatePower() {
        poderes[currPower].deactivatePower();
    }
}
