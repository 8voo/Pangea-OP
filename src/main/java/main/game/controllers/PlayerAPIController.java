package main.game.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import com.google.gson.Gson;

import main.game.model.Player;
import main.game.services.PangeaServices;

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

    @RequestMapping(path="{nickname}" ,method = RequestMethod.PUT)
    public ResponseEntity<?> changeToReady(@PathVariable String nickname, @RequestBody boolean state){
        Player player = pgs.getPlayer(nickname);
        System.out.println(player);
        player.setListo(state);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    
    @RequestMapping(method = RequestMethod.GET, path = "{nickname}")
    public ResponseEntity<?> getPlayerByNickname(@PathVariable String nickname){
        if(pgs.getPlayer(nickname) == null){
            return new ResponseEntity<>( HttpStatus.NOT_FOUND);
        }else{
            return new ResponseEntity<>(new Gson().toJson(pgs.getPlayer(nickname)), HttpStatus.ACCEPTED);
        }
    }

    

}
