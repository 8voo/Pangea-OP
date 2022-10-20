package game.model;

public class Player {
    private int soldadosDisponibles;
    private int soldadosTotales;
    private int nacionesTotal;


    public Player(int disponibles, int totales, int naciones){
        this.soldadosTotales = totales;
        this.soldadosDisponibles = disponibles;
        this.nacionesTotal = naciones;
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

    public int getSoldadosDisponibles(){
        return this.soldadosDisponibles;
    }

    public int getSoldadosTotales(){
        return this.soldadosTotales;
    }

    public int getNaciones(){
        return this.nacionesTotal;
    }

    public void addOneSol(){
        this.soldadosDisponibles+=1;
        this.soldadosTotales+=1;
    }
}
