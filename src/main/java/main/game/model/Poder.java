package main.game.model;

public interface Poder {
        public String getName();
        public void activatePower(Player player);
        public boolean isActive();
}
