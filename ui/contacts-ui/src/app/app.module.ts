import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './Components/root/app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HttpService} from './Services/http/http.service';
import { ContactDetailsComponent } from './Components/contact-details/contact-details.component';
import { CreateContactComponent } from './Components/create-contact/create-contact.component';
import {ContactListModule} from "./Components/contacts-list/contact-list.module";
import {AppRoutingModule} from "./Components/root/app-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    ContactDetailsComponent,
    CreateContactComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ContactListModule,
    AppRoutingModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
