type ShippingAddress = {
    firstName: string;
    lastName: string;
    city: string;
    region: string;
    postcode: string;
    telephone: string;
    defaultBilling?: boolean;
};

interface FormattedMagentoShippingAddress extends ShippingAddress {
    street: string[];
    countryCode: string;
    company: string | null;
}

interface ShippingAddressFormEntry extends ShippingAddress {
    company?: string;
    addressLine1: string;
    addressLine2?: string;
    optOut?: boolean;
    callingCode: string;
    country: string;
}

interface RawMagentoShippingAddress {
    id: number;
    firstname: string;
    lastname: string;
    street: string[];
    city: string;
    region: {
        region: string;
        region_code: string;
    };
    postcode: string;
    country_code: string;
    telephone: string;
    default_billing: boolean;
}

interface CheckoutProps {
    savedAddresses: FormattedMagentoShippingAddress[];
}

interface HandleFetchDataForPaymentVariables {
    email: string;
    firstName: string;
    lastName: string;
    company?: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    region: string;
    postcode: string;
    country: string;
    callingCode: string;
    telephone: string;
    isFormComplete: boolean;
    saveAddress: boolean;
    defaultBilling: boolean;
}
