import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import Contact from "../shared/contact-detail.model";
import {DataStoreService} from "../../Services/data-store-service/data-store.service";
import {Router} from "@angular/router";

interface FormValue {
  name: string;
  email: string;
  phoneNumber: string;
  country: string;
  city: string;
  street: string;
  houseNumber: string;
  apartment: string;
}

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent implements OnInit,OnDestroy {

  constructor(private dataStoreService: DataStoreService,
              private router: Router) { }

  addContactForm: FormGroup;
  phoneNumbers: string [] = [];
  addresses = [];
  editMode = false;
  editedContact: Contact;
  phoneNumberIndex: number = 0;
  addressIndex: number = 0;


  ngOnInit() {
    this.addContactForm = new FormGroup({
      name: new FormControl('',[]),
      email: new FormControl('',[]),
      phoneNumber: new FormControl('',[]),
      country: new FormControl('',[]),
      city: new FormControl('',[]),
      street: new FormControl('',[]),
      houseNumber: new FormControl('',[]),
      apartment: new FormControl('',[])
    });

    this.dataStoreService.editedContact
      .subscribe((editDetails: {contact: Contact, id: number}) => {
        this.editedContact = editDetails.contact;
        if(editDetails.id >= 0){
          this.editMode = true;
          // this.editedId = editDetails.id;
          this.viewEditedContact(this.editedContact);
        }
      });
  }

  viewEditedContact(editedContact: Contact){
    this.addContactForm.setValue({
      name: editedContact.fullName,
      email: editedContact.email,
      phoneNumber: editedContact.phoneNumbers[0],
      country: editedContact.addresses[0].country,
      city: editedContact.addresses[0].city,
      street: editedContact.addresses[0].street,
      houseNumber: editedContact.addresses[0].houseNumber,
      apartment: editedContact.addresses[0].apartment
    })
  }
  onFormSubmit() {
      const formValue: FormValue = this.addContactForm.value;
      this.addresses.push({
        country: formValue.country,
        city: formValue.city,
        street: formValue.street,
        houseNumber: formValue.houseNumber,
        apartment: formValue.apartment
      });

      this.phoneNumbers.push(formValue.phoneNumber);

          const contact = new Contact(
            formValue.name,
            formValue.email,
            this.phoneNumbers,
            this.addresses
            );
      if(!this.editMode) {
        this.dataStoreService.saveContact({
          fullName:  formValue.name,
          email: formValue.email,
          phoneNumbers: this.phoneNumbers,
          addresses: this.addresses
        });
      }
      else{
        this.dataStoreService.updateContact({
          fullName: formValue.name,
          email: formValue.email,
          phoneNumbers: [formValue.phoneNumber,...this.editedContact.phoneNumbers.slice(1)],
          addresses: [{
            country: formValue.country,
            city: formValue.city,
            street: formValue.street,
            houseNumber: formValue.houseNumber,
            apartment: formValue.apartment
          },...this.editedContact.addresses.slice(1)]
        });
      }
      this.dataStoreService.editedContact.next({contact: new Contact('','',[],[]),id: -1});
      this.router.navigate(['']);
    }

    ngOnDestroy(): void {

    }

}
