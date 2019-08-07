import {NgModule} from "@angular/core";
import {ContactsListComponent} from "./contacts-list.component";
import {CommonModule} from "@angular/common";
import {SearchPipe} from "../shared/search.pipe";
import {AppRoutingModule} from "../root/app-routing.module";

@NgModule({
  declarations: [
    ContactsListComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    ContactsListComponent,
    SearchPipe
  ]
})
export class ContactListModule {

}
