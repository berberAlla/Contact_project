
export class Address {

  constructor(private _country,
              private _city,
              private _street,
              private _houseNumber,
              private _apartment){}

  get country() {
    return this._country;
  }

  set country(value) {
    this._country = value;
  }

  get city() {
    return this._city;
  }

  set city(value) {
    this._city = value;
  }

  get street() {
    return this._street;
  }

  set street(value) {
    this._street = value;
  }

  get houseNumber() {
    return this._houseNumber;
  }

  set houseNumber(value) {
    this._houseNumber = value;
  }

  get apartment() {
    return this._apartment;
  }

  set apartment(value) {
    this._apartment = value;
  }
}
