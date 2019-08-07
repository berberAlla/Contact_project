import { Component, OnInit } from '@angular/core';
import Contact from "../contacts-list/model/Contact";
import {HttpService} from "../../Services/http/http.service";

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {

  contacts: Contact;

  constructor(private httpService: HttpService) { }

  ngOnInit() {

  }

  // loadContact(){
  //   this.httpService.getAllContacts()
  //     .subscribe((data) => this.contact = data);
  // }

}
