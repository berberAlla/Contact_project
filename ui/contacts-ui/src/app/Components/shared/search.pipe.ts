import {Pipe, PipeTransform} from "@angular/core";
import Contact from "./contact-detail.model";

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform{

  transform(value: Contact[], name: string, phone:string): any {
    if(!name && !phone){
      return value;
    }
    return value.filter((contact: Contact) => {
      return contact.fullName === name && !!contact.phoneNumbers.filter((contactPhone) => {
        return phone === contactPhone;
      }).length
    })
  }
}
