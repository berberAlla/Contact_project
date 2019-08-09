import {Address} from "./address.model";

export default class Contact {

  constructor(public fullName: string,
              public email:string,
              public phoneNumbers: any [],
              public addresses: any[]) {}

}


