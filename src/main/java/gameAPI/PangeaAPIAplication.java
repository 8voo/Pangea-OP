package gameAPI;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"game"})
public class PangeaAPIAplication {

    public static void main(String[] args){
        SpringApplication.run(PangeaAPIAplication.class, args);
    }
}
