export default class Contact {
  private _fullName: string;
  private _email: string;
  private _phoneNumbers: [];
  private _addresses: [];


  constructor(fullName: string, email: string, phoneNumbers: [], addresses: []) {
    this._fullName = fullName;
    this._email = email;
    this._phoneNumbers = phoneNumbers;
    this._addresses = addresses;
  }


  get fullName(): string {
    return this._fullName;
  }

  get email(): string {
    return this._email;
  }

  get phoneNumbers(): [] {
    return this._phoneNumbers;
  }

  get addresses(): [] {
    return this._addresses;
  }

  set fullName(value: string) {
    this._fullName = value;
  }

  set email(value: string) {
    this._email = value;
  }

  set phoneNumbers(value: []) {
    this._phoneNumbers = value;
  }

  set addresses(value: []) {
    this._addresses = value;
  }
}


