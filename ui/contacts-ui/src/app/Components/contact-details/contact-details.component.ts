import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import Contact from "../shared/contact-detail.model";
import {HttpService} from "../../Services/http/http.service";

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css'],
  encapsulation: ViewEncapsulation.None
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
