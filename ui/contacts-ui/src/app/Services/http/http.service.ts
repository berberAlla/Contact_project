import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import Contact from "../../Components/shared/contact-detail.model";
import {ɵStyleData} from "@angular/animations";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  //
  httpGetContacts() {
    return this.httpClient.get<Contact[]>("api/contact/all");
  }

  httpAddContact(contact){

    debugger;
    return this.httpClient.post("/api/contact",contact);
  }



}
