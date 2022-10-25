package main.game.model;

public class Nation {
    private String id;
    private int soldados = 0;
    private String color = "transparent";
    private String leader = "";
    private boolean bloqueada =  false;


    public Nation(String id){
        this.id = id;
    }

    public String getId(){
        return id;
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

    public void changeBloqueado(){
        this.bloqueada = !bloqueada;
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
