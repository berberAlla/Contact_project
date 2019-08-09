import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpService} from "../../Services/http/http.service";
import Contact from "../shared/contact-detail.model";
import {DataStoreService} from "../../Services/data-store-service/data-store.service";
import {distinct, distinctUntilChanged} from "rxjs/operators";

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {

  contacts: Contact [] = [];
  // @ViewChild('name') searchName: ElementRef;
  // @ViewChild('phone') searchPhone: ElementRef;
  searchName: string = '';
  searchPhone: string = '';

  constructor(private dataStoreService: DataStoreService) {}

  ngOnInit() {

    this.dataStoreService.fetchContacts();
    this.dataStoreService.contactsFetched
      .subscribe((contacts) => {
        this.contacts = this.correctContactsArray(this.dataStoreService.contactsFetched.value);
      })
      // .subscribe((contacts) => {
      //   this.contacts = contacts;
      //   this.dataStoreService.contactsFetched.next(contacts);
      // });
    // this.dataStoreService.fetchContacts()
    //   .subscribe((contacts) => {
    //     this.contacts = contacts;
    //     this.dataStoreService.contactsFetched.next(contacts);
    //   });
  }

  correctContactsArray(contacts){
    let result = [];
    contacts.forEach((contact) => {
      console.log(contact);
      if(!!contact){
        result.push(contact);
      }
    });
    return result;
  }

  onSearchClick(searchData){
    this.searchName = searchData.name.value;
    this.searchPhone = searchData.phone.value;
  }


}
