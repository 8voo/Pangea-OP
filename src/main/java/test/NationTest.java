package test;
import main.game.services.NationServices;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import static org.junit.Assert.*;
 public class NationTest {
     @Before
     public void setUp(){
         ApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
         NationServices nts = app.getBean(NationServices.class);
     }

    @Test
    public void crearNacion(){

    }


}
