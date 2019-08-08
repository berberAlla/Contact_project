import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import Contact from "../shared/contact-detail.model";
import {DataStoreService} from "../../Services/data-store-service/data-store.service";

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ContactDetailsComponent implements OnInit {

  contacts: Contact [] = [];
  contactDetailId: number;
  contactToView: Contact;

  constructor(private activatedRouted: ActivatedRoute,
              private dataStoreService: DataStoreService) { }

  ngOnInit() {
    this.dataStoreService.contactsFetched
      .subscribe((contacts: Contact[]) => {
        this.contacts = contacts;
      });
    this.activatedRouted.params
      .subscribe((params) => {
        this.contactDetailId = params.id;
        this.contactToView = this.contacts[this.contactDetailId];
        // console.log(params);
      });

  }



}
