import {Injectable, OnInit} from "@angular/core";
import {HttpService} from "../http/http.service";
import Contact from "../../Components/shared/contact-detail.model";
import {BehaviorSubject, Observable, Observer, Subject} from "rxjs";
import {Router} from "@angular/router";
import {distinct, take} from "rxjs/operators";

@Injectable({providedIn: "root"})
export class DataStoreService{
  constructor(private http: HttpService,
              private router: Router){

  }

  contacts: Contact[] = [];
  contactsFetched: BehaviorSubject<Contact[]> = new BehaviorSubject([]);
  editedContact: BehaviorSubject<{contact: Contact, id: number}>
    = new BehaviorSubject({contact: new Contact('','',[],[]),id: -1});


  fetchContacts(){
    this.http.httpGetContacts()
      .subscribe((contacts) => {
        this.contacts = contacts;
        this.contactsFetched.next(contacts);
    });
  }

  saveContact(contact: Contact){
    this.http.httpAddContact(contact)
      .subscribe((savedContact) => {
        //this.fetchContacts();
        this.contacts.push(contact);
        this.contactsFetched.next(this.contacts);
      })
  }


  updateContact(contact: Contact){
    let id = this.editedContact.value.id + 1;
    this.http.httpUpdateContact(contact,id)
      .subscribe((updatedContact) => {
       // this.fetchContacts();
        this.contacts.splice(id,1,contact);
        this.contactsFetched.next(this.contacts);
      })
  }

  deleteContact(id: number){
    this.http.httpDeleteContact(id + 1)
      .subscribe((deletedContact) => {
        //console.log(deletedContact);
        this.contacts[id] = undefined;
        this.contactsFetched.next(this.contacts);
        this.router.navigate(['/']);
      })
  }
}
