export class ShippingAddressDto implements ShippingAddress {
    firstName: string;
    lastName: string;
    city: string;
    region: string;
    postcode: string;
    telephone: string;
    defaultBilling?: boolean;

    constructor(data: ShippingAddress) {
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.city = data.city;
        this.region = data.region;
        this.postcode = data.postcode;
        this.telephone = data.telephone;
        this.defaultBilling = data.defaultBilling;
    }
}

export class FormattedMagentoShippingAddressDto
    extends ShippingAddressDto
    implements FormattedMagentoShippingAddress
{
    street: string[];
    countryCode: string;
    company: string | null;

    constructor(data: FormattedMagentoShippingAddress) {
        super(data);
        this.street = data.street;
        this.countryCode = data.countryCode;
        this.company = data.company;
    }
}

export class ShippingAddressFormEntryDto
    extends ShippingAddressDto
    implements ShippingAddressFormEntry
{
    company?: string;
    addressLine1: string;
    addressLine2?: string;
    optOut?: boolean;
    callingCode: string;
    country: string;

    constructor(data: ShippingAddressFormEntry) {
        super(data);
        this.company = data.company;
        this.addressLine1 = data.addressLine1;
        this.addressLine2 = data.addressLine2;
        this.optOut = data.optOut;
        this.callingCode = data.callingCode;
        this.country = data.country;
    }
}
