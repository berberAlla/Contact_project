package contact.repository;

import contact.model.entity.PhoneNumber;
import contact.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PhoneNumberRepository extends JpaRepository<PhoneNumber,Long> {

    List <PhoneNumber> findAllByUser(User user);

    Optional <PhoneNumber> findPhoneNumberByPhoneNumber(String phoneNumber);

    Optional <List <PhoneNumber>> findAllByPhoneNumber(String phoneNumber);

    void deleteAllByUser(User user);

    boolean existsByPhoneNumber(String phoneNumber);
}
