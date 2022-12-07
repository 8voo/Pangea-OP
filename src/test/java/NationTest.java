
import main.game.model.Nation;
import main.game.services.NationServices;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.ArrayList;

public class NationTest {
     ApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
     NationServices nts = app.getBean(NationServices.class);

    //  @Before
    //  public void setUp(){
    //      nts.deleteAll();
    //  }

    // @Test
    // public void crearNaciones(){
    //     ArrayList<Nation> nations =  nts.getAllNations();
    //     assertEquals(nations.size(), 35);
    //     assertEquals(nations.get(0).getId(),"nation1");
    // }


}
