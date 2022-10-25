package main.game.controllers;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import com.google.gson.Gson;

import main.game.model.Player;
import main.game.services.PlayerServices;

@Service
@RestController
@RequestMapping(value = "/player")
public class PlayerAPIController {
    
    @Autowired 
    PlayerServices pgs;


    //POST
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> addNewPlayer(@RequestBody Player p){
        pgs.addNewPlayer(p);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    // GET
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> getAllPlayers(){
        return new ResponseEntity<>(new Gson().toJson(pgs.getAllPlayers()), HttpStatus.ACCEPTED);
    }

    @RequestMapping(path = "{nickname}/soldierQuantity", method = RequestMethod.GET)
    public ResponseEntity<?> getDisponibleSoldiers(@PathVariable String nickname){
        Player player = pgs.getPlayer(nickname);
        ArrayList<Integer> soldadosq = new ArrayList<Integer>();
        soldadosq.add(player.getSoldadosDisponibles());
        soldadosq.add(player.getSoldadosTotales());
        return new ResponseEntity<>(new Gson().toJson(soldadosq), HttpStatus.ACCEPTED);
    }

    @RequestMapping(path = "ready", method = RequestMethod.GET)
    public ResponseEntity<?> getReady(){
        return new ResponseEntity<>(new Gson().toJson(pgs.allReady()), HttpStatus.ACCEPTED);
    }
    
    @RequestMapping(path = "{nickname}", method = RequestMethod.GET)
    public ResponseEntity<?> getPlayerByNickname(@PathVariable String nickname){
        if(pgs.getPlayer(nickname) == null){
            return new ResponseEntity<>( HttpStatus.NOT_FOUND);
        }else{
            return new ResponseEntity<>(new Gson().toJson(pgs.getPlayer(nickname)), HttpStatus.ACCEPTED);
        }
    }

    @RequestMapping(path = "{nickname}/nations", method = RequestMethod.GET)
    public ResponseEntity<?> getNationsByNickname(@PathVariable String nickname){
        Player player = pgs.getPlayer(nickname);
        if(player == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else{
            return new ResponseEntity<>(new Gson().toJson(pgs.getNations(player)), HttpStatus.ACCEPTED);
        }
    }

    //PUT
    @RequestMapping(path="{nickname}" ,method = RequestMethod.PUT)
    public ResponseEntity<?> changeToReady(@PathVariable String nickname, @RequestBody boolean state){
        Player player = pgs.getPlayer(nickname);
        System.out.println(player);
        player.setListo(state);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @RequestMapping(path = "{nickname}/soldiers", method = RequestMethod.PUT)
    public ResponseEntity<?> addSoldiers(@PathVariable String nickname, @RequestBody String quant){
        pgs.addOneSol(pgs.getPlayer(nickname));
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @RequestMapping(path = "{nickname}/nations", method = RequestMethod.PUT)
    public ResponseEntity<?> addNations(@PathVariable String nickname, @RequestBody int idNation){
        //No esta terminado
        // pgs.addNationToPlayer(pgs.getPlayer(nickname), idNation);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

}
