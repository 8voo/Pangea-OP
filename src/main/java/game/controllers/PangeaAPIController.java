package game.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;


import game.services.PangeaServices;

@Service
@RestController
@RequestMapping(value = "/")
public class PangeaAPIController {
    
    @Autowired 
    PangeaServices pgs;

}
