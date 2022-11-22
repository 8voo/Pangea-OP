package main.game.model;

import java.util.HashSet;
import java.util.Set;

public class Player {
    private int id;
    private String nickname="";
    private int soldadosDisponibles = 1000;
    private int soldadosTotales = 10;
    private Set<String> naciones = new HashSet<String>();
    private boolean listo = false;
    private String color;

    public void deleteNation(String idNation){
        this.naciones.remove(idNation);
    }

    public void setId(int id){
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
    public int getId(){
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
