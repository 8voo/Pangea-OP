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

    //PUT
    @RequestMapping(path="{nation}", method = RequestMethod.PUT)
    public ResponseEntity<?> changeColor(@PathVariable String nation, @RequestBody String color){
        ns.changeColor(nation, color);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}