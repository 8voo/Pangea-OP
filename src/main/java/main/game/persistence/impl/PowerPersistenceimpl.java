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
        return Poder.getActive();
    }

    @Override
    public void activatePower(ArrayList<String> players) {
        this.currPower = (int)(Math.random() * poderes.length);
        if(poderes[currPower].getName() != "TripleClick"){
            players.remove(players.size() - 1);
            poderes[currPower].activatePower(players);
        } else{
            String singlePlayer = players.get(players.size() - 1);
            poderes[currPower].activatePower(singlePlayer);
        }
        // System.out.println("primero " + poderes[currPower]);
        // System.out.println("segundo " + getActivePower());
    }

    @Override
    public void deactivatePower() {
        poderes[currPower].deactivatePower();
    }

    @Override
    public ArrayList<String> getActivePlayers() {
        return poderes[currPower].getActivePlayers();
    }
}
