package main.game.model;

import java.util.ArrayList;

public interface Poder {

        public String getName();

        public void activatePower(ArrayList<String> players);
        
        public void activatePower(String  players);

        public boolean isActive();

        public void deactivatePower();

}
