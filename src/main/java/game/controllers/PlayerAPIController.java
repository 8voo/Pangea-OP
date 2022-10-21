package game.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import com.google.gson.Gson;

import game.model.Player;
import game.services.PangeaServices;

@Service
@RestController
@RequestMapping(value = "/player")
public class PlayerAPIController {
    
    @Autowired 
    PangeaServices pgs;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> getAllPlayers(){
        return new ResponseEntity<>(new Gson().toJson(pgs.getAllPlayers()), HttpStatus.ACCEPTED);
    }

    @RequestMapping(path = "ready", method = RequestMethod.GET)
    public ResponseEntity<?> getReady(){
        return new ResponseEntity<>(new Gson().toJson(pgs.allReady()), HttpStatus.ACCEPTED);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> addNewPlayer(@RequestBody Player p){
        System.out.println(p);
        pgs.addNewPlayer(p);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    

}
