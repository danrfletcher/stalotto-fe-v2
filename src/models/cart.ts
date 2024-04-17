export class NewShippingAddressDto {
    firstName: string;
    lastName: string;
    company: string;
    street: string;
    city: string;
    region: string;
    postcode: string;
    countryCode: string;
    telephone: string;
    saveInAddressBook: boolean;

    constructor(data: NewShippingAddress) {
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.company = data.company;
        this.street = data.street;
        this.city = data.city;
        this.region = data.region;
        this.postcode = data.postcode;
        this.countryCode = data.countryCode;
        this.telephone = data.telephone;
        this.saveInAddressBook = data.saveInAddressBook;
    }
}

