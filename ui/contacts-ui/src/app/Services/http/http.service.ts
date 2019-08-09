import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import Contact from "../../Components/shared/contact-detail.model";


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  httpGetContacts() {
    return this.httpClient.get<Contact[]>("api/contact/all");
  }

  httpAddContact(contact){
    return this.httpClient.post("/api/contact",contact);
  }

  httpUpdateContact(contact,id){
    return this.httpClient.put(`/api/contact/${id}`,contact);
  }

  httpDeleteContact(id){
    return this.httpClient.delete(`/api/contact/${id}`);
  }



}
