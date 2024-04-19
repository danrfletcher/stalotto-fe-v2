import {
    FormattedMagentoShippingAddressDto,
    ShippingAddressFormEntryDto,
} from '../../models/checkout';
import countryCodes from '../../data/countryCodes.json';
import { useContext } from 'react';
import cartContext from '../../contexts/cart/cartContext';

const useCheckout = () => {
    const { setCheckoutItem } = useContext(cartContext);

    const convertSavedAddressToFormEntry = (
        address: FormattedMagentoShippingAddress,
    ): ShippingAddressFormEntry | Error => {
        try {
            if (address instanceof FormattedMagentoShippingAddressDto) {
                const data: ShippingAddressFormEntry = {
                    firstName: address.firstName || '',
                    lastName: address.lastName || '',
                    company: `${
                        address.street[0].slice(0, 4) === 'FAO:'
                            ? address.street[0].slice(6)
                            : ''
                    }`,
                    addressLine1:
                        `${
                            address.street[0].slice(0, 4) === 'FAO:'
                                ? address.street[1]
                                : address.street[0]
                        }` || '',
                    addressLine2:
                        `${
                            address.street.length === 3
                                ? address.street[2]
                                : address.street.length === 2 &&
                                  address.street[0].slice(0, 4) !== 'FAO:'
                                ? address.street[1]
                                : ''
                        }` || '',
                    city: address.city || '',
                    region: address.region || '',
                    postcode: address.postcode || '',
                    country:
                        (function () {
                            const country = countryCodes.find(
                                country => country.code === address.countryCode,
                            );
                            if (country) return country.name;
                            else return '';
                        })() || '',
                    callingCode: address.telephone.split('~')[0] || '',
                    telephone: address.telephone.split('~')[1] || '',
                    defaultBilling: address?.defaultBilling || false,
                };
                return new ShippingAddressFormEntryDto(data);
            } else {
                throw new Error(
                    'The selected address is invalid & cannot be displayed in the form.',
                );
            }
        } catch (err) {
            console.error('Error: ', err);
            return err as Error;
        }
    };

    const handleSelectSavedAddress = (
        address: FormattedMagentoShippingAddress,
    ): void | Error => {
        //create data transfer object
        const addressDto = new FormattedMagentoShippingAddressDto(address);

        //convert to form entry address
        const formAddress: Record<string, any> =
            convertSavedAddressToFormEntry(addressDto);

        //set checkout state
        Object.keys(formAddress).map(key => {
            setCheckoutItem(key, formAddress[key]);
        });
        setCheckoutItem('savedAddressIsSelected', true); //prevent 'save this address' checkbox from appearing when saved address is selected
    };

    return { handleSelectSavedAddress };
};

export default useCheckout;
