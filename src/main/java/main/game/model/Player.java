package main.game.model;

import java.util.ArrayList;

public class Player {
    private int id;
    private String nickname="";
    private int soldadosDisponibles = 0;
    private int soldadosTotales = 0;
    private ArrayList<Nation> naciones = new ArrayList<Nation>();
    private boolean listo = false;
    private String color;

    public void deleteNation(Nation nacion){
        this.naciones.remove(nacion);
    }

    public void setId(int id){
        this.id = id;
    }

    public void setSoldadosTotales(int soldados){
        this.soldadosTotales = soldados;
    }

    public void setNacion(Nation nacion){
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

    public ArrayList<Nation> getNaciones(){
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
