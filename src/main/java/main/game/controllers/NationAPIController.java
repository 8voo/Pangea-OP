package main.game.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import com.google.gson.Gson;

import main.game.services.NationServices;

@Service
@RestController
@RequestMapping(value = "/nation")
public class NationAPIController {
    
    @Autowired 
    NationServices ns;


    //GET
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> getAllNations(){
        return new ResponseEntity<>(new Gson().toJson(ns.getAllNations()), HttpStatus.ACCEPTED);
    }

    @RequestMapping(path = "{nation}",method = RequestMethod.GET)
    public ResponseEntity<?> getNationById(@PathVariable String nation){
        return new ResponseEntity<>(new Gson().toJson(ns.getNationById(nation)), HttpStatus.ACCEPTED);
    }

    //PUT
    @RequestMapping(path="{nation}", method = RequestMethod.PUT)
    public ResponseEntity<?> changeColor(@PathVariable String nation, @RequestBody String color){
        ns.changeColor(nation, color);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @RequestMapping(path="{nation}/block", method = RequestMethod.PUT)
    public ResponseEntity<?> blockNation(@PathVariable String nation, @RequestBody boolean block){
        ns.changeBlockNation(nation);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @RequestMapping(path = "{nation}/soldiers", method = RequestMethod.PUT)
    public ResponseEntity<?> setSoldiers(@PathVariable String nation, @RequestBody int newSoldiers){
        ns.setSoldiers(nation, newSoldiers);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @RequestMapping(path = "{nation}/leader", method = RequestMethod.PUT)
    public ResponseEntity<?> setLeader(@PathVariable String nation, @RequestBody String nickname){
        ns.setLeader(nation, nickname);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

}