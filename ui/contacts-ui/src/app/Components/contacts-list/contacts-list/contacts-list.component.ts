import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../../Services/http/http.service";
import Contact from "../model/Contact";

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {

  contacts: Contact [] = [];

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.loadContacts();
  }

  loadContacts(){
    this.httpService.getAllContacts()
      .subscribe((data) => this.contacts = data);
  }

}
