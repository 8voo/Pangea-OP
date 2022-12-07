package main.game.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import main.game.model.Player;

@Repository
@Component("playerRepository")
public interface PlayerRepository extends MongoRepository<Player, Integer>{
    
}
