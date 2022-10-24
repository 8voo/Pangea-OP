package main.game.model;

public class Player {
    private int id;
    private String nickname="";
    private int soldadosDisponibles = 0;
    private int soldadosTotales = 0;
    private int nacionesTotal=1;
    private boolean listo = false;
    private String color;


    public void setId(int id){
        this.id = id;
    }

    public void setSoldadosTotales(int soldados){
        this.soldadosTotales = soldados;
    }

    public void setNaciones(int naciones){
        this.nacionesTotal = naciones;
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

    public int getNaciones(){
        return this.nacionesTotal;
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
