import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ContactsListComponent} from "../contacts-list/contacts-list.component";
import {ContactDetailsComponent} from "../contact-details/contact-details.component";
import {CreateContactComponent} from "../create-contact/create-contact.component";

const appRoutes: Routes = [
  {path: '', component: ContactsListComponent},
  {path: 'contact-details/:id', component: ContactDetailsComponent},
  {path: 'create-contact', component: CreateContactComponent},
  {path: 'edit-contact', component: CreateContactComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(appRoutes)]
})
export class AppRoutingModule {

}
