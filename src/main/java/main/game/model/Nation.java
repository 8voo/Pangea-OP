package main.game.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("Nation")
public class Nation {
    @Id
    private String id;
    private int soldados = 10;
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
