import {Injectable, OnInit} from "@angular/core";
import {HttpService} from "../http/http.service";
import Contact from "../../Components/shared/contact-detail.model";
import {BehaviorSubject, Observable, Observer, Subject} from "rxjs";

@Injectable({providedIn: "root"})
export class DataStoreService{
  constructor(private http: HttpService){

  }

  contacts: Contact[] = [];
  contactsFetched: BehaviorSubject<Contact[]> = new BehaviorSubject([]);

  fetchContacts(){
    this.http.httpGetContacts()
      .subscribe((contactsList) => {
        this.contactsFetched.next(contactsList);
      })
  }

  saveContact(contact){
    this.http.httpAddContact(contact)
      .subscribe((savedContact) => {
        console.log(savedContact);
      })
  }


}
