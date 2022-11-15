package main.game.controllers;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import com.google.gson.Gson;

import main.game.services.PowerServices;

@Service
@RestController
@RequestMapping(value = "/power")
public class PowerAPIController {
    @Autowired 
    PowerServices ps;

    //GET
    @RequestMapping(path = "activePower", method = RequestMethod.GET)
    public ResponseEntity<?> getActivePower(){
        return new ResponseEntity<>(new Gson().toJson(ps.getActivePower()), HttpStatus.ACCEPTED);
    }

    @RequestMapping(path = "activePlayers", method = RequestMethod.GET)
    public ResponseEntity<?> activePlayers(){
        return new ResponseEntity<>(new Gson().toJson(ps.getActivePlayers()), HttpStatus.ACCEPTED); 
    }

    @RequestMapping(path = "activatePower", method  = RequestMethod.PUT)
    public ResponseEntity<?> activatePower(@RequestBody ArrayList<String> nicknames){
        ps.activatePower(nicknames);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @RequestMapping(path = "deactivatePower", method  = RequestMethod.PUT)
    public ResponseEntity<?> deactivatePower(){
        ps.deactivatePower();
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}
