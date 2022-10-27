package main.game.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import com.google.gson.Gson;

import main.game.services.PowerServices;

@Service
@RestController
@RequestMapping(value = "/nation")
public class PowerAPIController {
    @Autowired 
    PowerServices ps;

    //GET
    @RequestMapping(path = "activePower", method = RequestMethod.GET)
    public ResponseEntity<?> getActivePower(){
        return new ResponseEntity<>(new Gson().toJson(ps.getActivePower()), HttpStatus.ACCEPTED);
    }
}
