import {Address} from "./address.model";

export default class Contact {

  constructor(private _fullName: string,
              private _email:string,
              private _phoneNumbers: any [],
              private _addresses: Address[]) {}


  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get fullName(): string {
    return this._fullName;
  }

  set fullName(value: string) {
    this._fullName = value;
  }

  get phoneNumbers(): string[] {
    return this._phoneNumbers;
  }

  set phoneNumbers(value: string[]) {
    this._phoneNumbers = value;
  }

  get addresses(): Address[] {
    return this._addresses;
  }

  set addresses(value: Address[]) {
    this._addresses = value;
  }
}


