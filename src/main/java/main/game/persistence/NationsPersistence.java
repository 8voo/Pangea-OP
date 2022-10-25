package main.game.persistence;

import java.util.ArrayList;

import main.game.model.Nation;
import main.game.model.Player;

public interface NationsPersistence {

    public ArrayList<Nation> getAllNations();

    public void changeColor(String id, String color);

}