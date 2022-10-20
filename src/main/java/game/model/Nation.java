package game.model;

public class Nation {
    private int soldados;
    private String color;
    private String leader;

    public Nation(int soldados, String color, String leader){
        this.soldados = soldados;
        this.color = color;
        this.leader = leader;
    }

    public void setSoldados(int soldados){
        this.soldados = soldados;
    }

    public void setColor(String color){
        this.color = color;
    }

    public void serleader(String leader){
        this.leader = leader;
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

}
