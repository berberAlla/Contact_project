package contact.service;

import contact.exception.PhoneNumberNotFoundException;
import contact.exception.UserNotFoundException;
import contact.model.dto.AddressDto;
import contact.model.dto.ContactDto;
import contact.model.entity.Address;
import contact.model.entity.PhoneNumber;
import contact.model.entity.User;
import contact.repository.AddressRepository;
import contact.repository.PhoneNumberRepository;
import contact.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ContactServiceImpl implements ContactService {

    @Autowired
    private PhoneNumberRepository phoneNumberRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AddressRepository addressRepository;


    @Override
    @Transactional
    public void createContact(ContactDto contactDto) {
        User user = User.builder()
                .fullName(contactDto.getFullName())
                .email(contactDto.getEmail())
                .createdDate(LocalDateTime.now())
                .build();

        List <PhoneNumber> phoneNumbers = createPhoneNumbersFromContactDto(contactDto, user);

        List <Address> addresses = createAddressesFromContactDto(contactDto, user);

        userRepository.save(user);
        phoneNumberRepository.saveAll(phoneNumbers);
        addressRepository.saveAll(addresses);
    }


    @Override
    @Transactional
    public void updateContact(Long id, ContactDto contactDto) {
        // TODO: 2019-06-11 Think how change phoneNumber and address without delete

        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User doesn't exist by id"));

        user.setFullName(contactDto.getFullName());
        user.setEmail(contactDto.getEmail());

        List <PhoneNumber> phoneNumbersToChange = createPhoneNumbersFromContactDto(contactDto, user);

        List <Address> addressesToChange = createAddressesFromContactDto(contactDto, user);

        userRepository.save(user);
        phoneNumberRepository.saveAll(phoneNumbersToChange);
        addressRepository.saveAll(addressesToChange);

    }

    @Override
    @Transactional
    public void deleteContact(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User doesn't exist by id"));

        phoneNumberRepository.deleteAllByUser(user);
        addressRepository.deleteAllByUser(user);
        userRepository.delete(user);

    }

    @Override
    @Transactional(readOnly = true)
    public ContactDto getContact(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User doesn't exist by id"));

        List <PhoneNumber> phoneNumbers = phoneNumberRepository.findAllByUser(user);
        List <Address> addresses = addressRepository.findAllByUser(user);

        ContactDto contactDto = ContactDto.builder()
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phoneNumbers(phoneNumbers.stream().map(PhoneNumber::getPhoneNumber).collect(Collectors.toList()))
                .addresses(addresses.stream().map(address -> convertAddressToAddressDto(address)).collect(Collectors.toList()))
                .build();

        return contactDto;

    }

    @Override
    @Transactional(readOnly = true)
    public List <ContactDto> getAllContacts() {
        List <Long> ids = userRepository.getAllIds();

        return ids.stream().map(id -> getContact(id)).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public ContactDto getContactByName(String name) {
        User user = userRepository.findUserByFullName(name);
        return getContact(user.getId());
    }

    @Override
    @Transactional(readOnly = true)
    public List <ContactDto> getContactByPhoneNumber(String number) {
        List <PhoneNumber> phoneNumbers = phoneNumberRepository.findAllByPhoneNumber(number)
                .orElseThrow(() -> new PhoneNumberNotFoundException("Can't find contact by this phone number"));

        List <ContactDto> contacts = new ArrayList <>();

        phoneNumbers.stream()
                .map(phone -> phone.getUser())
                .flatMap(users -> users.stream())
                .forEach(user -> contacts.add(getContact(user.getId())));

        return contacts;
    }

    private AddressDto convertAddressToAddressDto(Address address) {
        return AddressDto.builder()
                .country(address.getCountry())
                .city(address.getCity())
                .street(address.getStreet())
                .apartment(address.getApartment())
                .houseNumber(address.getHouseNumber())
                .build();
    }

    private Address convertAddressDtoToAddress(User user, AddressDto address) {
        Address addressFromDB = addressRepository.findByCountryAndCityAndStreetAndHouseNumberAndApartment(address.getCountry(),
                address.getCity(), address.getStreet(), address.getHouseNumber(), address.getApartment())
                .orElse(new Address(0l, LocalDateTime.now(), address.getCountry(),
                        address.getCity(), address.getStreet(), address.getHouseNumber(),
                        address.getApartment(), new ArrayList <>()));

        addressFromDB.getUser().add(user);

        return addressFromDB;
    }

    private List <Address> createAddressesFromContactDto(ContactDto contactDto, User user) {
        return contactDto.getAddresses().stream()
                .map(address -> convertAddressDtoToAddress(user, address)).collect(Collectors.toList());
    }

    private List <PhoneNumber> createPhoneNumbersFromContactDto(ContactDto contactDto, User user) {
        return contactDto.getPhoneNumbers().stream()
                .map(phone -> getPhoneNumberFromString(phone, user))
                .collect(Collectors.toList());
    }

    private PhoneNumber getPhoneNumberFromString(String phone, User user) {

        PhoneNumber phoneNumberFromDB = phoneNumberRepository.findPhoneNumberByPhoneNumber(phone)
                .orElse(PhoneNumber.builder()
                        .id(0l)
                        .createdDate(LocalDateTime.now())
                        .phoneNumber(phone)
                        .user(new ArrayList <>())
                        .build());

        phoneNumberFromDB.getUser().add(user);

        return phoneNumberFromDB;
    }
}
