package contact.repository;

import contact.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User,Long> {

    @Query("select u.id from User u")
    List<Long> getAllIds();

    User findUserByFullName(String fullName);

}
