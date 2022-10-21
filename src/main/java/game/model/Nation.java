package game.model;

public class Nation {
    private int soldados;
    private String color;
    private String leader;
    private boolean bloqueada;

    public Nation(int soldados, String color, String leader, boolean bloqueada){
        this.soldados = soldados;
        this.color = color;
        this.leader = leader;
        this.bloqueada = bloqueada;
    }

    public void setSoldados(int soldados){
        this.soldados = soldados;
    }

    public void setColor(String color){
        this.color = color;
    }

    public void setleader(String leader){
        this.leader = leader;
    }

    public void setBloqueado(boolean bloqueada){
        this.bloqueada = bloqueada;
    }

    public int getSoldados(){
        return soldados;
    }

    public String getColor(){
        return color;
    }
    
    public String getleader(){
        return leader;
    }

    public boolean isBloqueado(){
        return bloqueada;
    }

}
