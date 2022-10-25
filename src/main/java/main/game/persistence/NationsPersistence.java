package main.game.persistence;

import java.util.ArrayList;

import main.game.model.Nation;

public interface NationsPersistence {

    public Nation getNationById(String id);

    public void changeBlockNation(Nation nation);

    public ArrayList<Nation> getAllNations();

    public void changeColor(String id, String color);

}