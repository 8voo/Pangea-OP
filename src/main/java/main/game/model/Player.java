package main.game.model;

import java.util.HashSet;
import java.util.Set;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("Player")
public class Player {
    @Id
    private ObjectId id;
    private String nickname="";
    private int soldadosDisponibles = 10;
    private int soldadosTotales = 10;
    private Set<String> naciones = new HashSet<String>();
    private boolean listo = false;
    private String color;

    public void deleteNation(String idNation){
        this.naciones.remove(idNation);
    }

    public void setId(ObjectId id){
        this.id = id;
    }

    public void setSoldadosTotales(int soldados){
        this.soldadosTotales = soldados;
    }

    public void addNacion(String nacion){
        this.naciones.add(nacion);
    }

    public void setSoldadosDisponibles(int soldados){
        this.soldadosDisponibles = soldados;
    }

    public void setListo(boolean listo){
        this.listo = listo;
    }

    public void setNickname(String nickname){
        this.nickname = nickname;
    }

    public void setColor(String color){
        this.color = color;
    }

    public int getSoldadosDisponibles(){
        return this.soldadosDisponibles;
    }

    public int getSoldadosTotales(){
        return this.soldadosTotales;
    }

    public Set<String> getNaciones(){
        return this.naciones;
    }
    
    public boolean isListo(){
        return listo;
    }
    public ObjectId getId(){
        return this.id;
    }

    public String getNickname(){
        return this.nickname;
    }

    public String getColor(){
        return this.color;
    }

    public void addOneSol(){
        this.soldadosDisponibles+=1;
        this.soldadosTotales+=1;
    }

}
