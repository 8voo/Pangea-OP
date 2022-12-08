package main.game.repositories;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import main.game.model.Player;

@Repository
@Component
public interface PlayerRepository extends MongoRepository<Player, ObjectId>{
    
}
