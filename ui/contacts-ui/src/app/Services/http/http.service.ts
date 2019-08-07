import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import Contact from "../../Components/contacts-list/model/Contact";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  getAllContacts() {
    return this.httpClient.get<Contact[]>("api/contact/all");
  }

  // getContactById(){
  //   return
  // }

}
