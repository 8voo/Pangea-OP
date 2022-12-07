package main.game.repositories;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import main.game.model.Nation;
import org.springframework.data.mongodb.repository.MongoRepository;

@Repository
@Component
public interface NationRepository extends MongoRepository<Nation, String>{
    
}
