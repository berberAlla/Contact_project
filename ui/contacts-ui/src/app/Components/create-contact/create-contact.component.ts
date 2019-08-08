import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import Contact from "../shared/contact-detail.model";
import {Address} from "../shared/address.model";
import {DataStoreService} from "../../Services/data-store-service/data-store.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

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
export class CreateContactComponent implements OnInit {

  constructor(private dataStoreService: DataStoreService,
              private http: HttpClient,
              private activatedRoute: ActivatedRoute) { }

  addContactForm: FormGroup;
  phoneNumbers: string [] = [];
  addresses = [];

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
    })

    this.activatedRoute.url.subscribe((url) => {
      console.log(url);
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

      this.dataStoreService.saveContact({
        fullName:  formValue.name,
        email: formValue.email,
        phoneNumbers: this.phoneNumbers,
        addresses: this.addresses
      });
    }

}
